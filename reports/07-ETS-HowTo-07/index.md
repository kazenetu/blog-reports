[WIP]TypeScriptでenchant.jsを使ってサンプルを作ってみる その7

# はじめに
TypeScriptでenchant.jsを開発するためのライブラリ「ets-framework」を作成しました。  
[https://github.com/kazenetu/enchantjs-typescript](https://github.com/kazenetu/enchantjs-typescript)  
「starter/use-framework/template/」を使ってサンプルプログラムを開発しています。

# 今回のゴール
マップを表示します。  
※Mapデータは[enchantMapEditor](https://github.com/wise9/enchantMapEditor)で作成したデータを利用します。  

※利用可能なGitHubPagesを用意しました。ご利用ください。  
  [http://kazenetu.github.io/enchantMapEditor/mapeditor.html](http://kazenetu.github.io/enchantMapEditor/mapeditor.html)  

##  前提
[ビルド環境の構築](http://kazenetu.exblog.jp/22812282/)を参照して、下記を実行してください。  
※バージョンが1.0.__8__ に更新されています。  
・ templateフォルダの展開  
・ ```npm install```の実行  

## ソースコード
[https://github.com/kazenetu/blog-reports/tree/master/reports/07-ETS-HowTo-07/template](https://github.com/kazenetu/blog-reports/tree/master/reports/07-ETS-HowTo-07/template)

# 開発環境
下記がインストールされている前提です。  
カッコ内は私の環境です。  
・Node.js（5.6.0）  
・npm(3.8.3)  

--------ここまで

--------実際の作成データが必要

# 実装手順
1.template/assets/resources/ にマップグラフィック(map0.gif)を追加してください。  
※[enchant.js Image Materials](http://enchantjs.com/ja/image-materials/)の素材を使用しています。    
![マップグラフィック](./template/assets/resources/map0.gif)

2.template/assets/js/plugins/extendMap.enchant.jsを追加してください。  


3.template/assets/data/ に[enchantMapEditor](https://github.com/wise9/enchantMapEditor)で作成し、「コード生成」ボタンでマップ作成コードをテキストに保存しておいてください。  


2.template/main.tsを開き、下記の実装をしてください。
※処理を追加していないメソッドは除外しています。

``` typesctipt
class GameMain extends Rf.ETS.FrameWork.GameMain {
    //フィールド
    private sprite: Rf.ETS.FrameWork.Character = null; //※1
    private isFall:boolean = false;
    private fallSpeed:number = 0;

    /**
     * 初期化イベント
     * @method
     * @name FrameWork.GameMain#onInitialize
     */
    protected onInitialize(): void { //※2
        //サイズを320x480に変更
        this.screenWidth = 320;
        this.screenHeight = 480;

        //fpsを設定
        this.fps = 20;
    }

    /**
      * リソース設定イベント
      * @method
      * @name FrameWork.GameMain#resourceLoad
      */
    protected onResourceSetting(): void { //※3
        //this.resourceManager.SetResourcePathメソッドでリソースのルートパスを設定
        this.resourceManager.SetResourcePath("./assets/resources/");

        //リソースのキーとファイルパスを記述
        this.resourceManager.AddResourceName("charaImage", "3x4_chara.png");
    }

    /**
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    protected onLoad(parent: enchant.Group): void { //※4
        //グラフィックを生成
        this.sprite = new Rf.ETS.FrameWork.Character(32, 32, parent); //※4.1
        //イメージの設定(Rf.ETS.FrameWork.Sprite独自の機能)
        this.sprite.FileName = this.resourceManager.GetResourceName("charaImage"); //※4.2
        //その他の設定(Rf.ETS.FrameWork.Character独自の機能) //※4.3
        this.sprite.charaIndex = 1;
        this.sprite.Dir = Rf.ETS.FrameWork.Direction.Down;
        this.sprite.AnimePattern = [0,1,0,2];
        this.sprite.AnimeWidth = 3;
        this.sprite.Init();

        this.sprite.touchEnabled = true;
        this.sprite.x = 100;
        this.sprite.y = 100;

        //グラフィックのタップで落下するイベント //※4.4
        this.sprite.on(enchant.Event.TOUCH_END,(e:enchant.Event)=>{
          if(this.isFall === false){
            this.isFall = true;
            this.fallSpeed = 2;
            //アニメを停止させる(Rf.ETS.FrameWork.Character独自の機能) //※4.5
            this.sprite.SuspendAnime();
          }
        });
    }

    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    protected onRun(): void { //※5
      //歩行アニメする(Rf.ETS.FrameWork.Character独自の機能)
      this.sprite.Run();

      //タップされた場合はグラフィックを落下させる
      if(this.isFall){
        this.sprite.y += this.fallSpeed;
        if(this.fallSpeed < 10){
          this.fallSpeed += 1;
        }
        if(this.sprite.y > 480){
          this.sprite.y = 100;
          this.isFall = false;
          //アニメを再開させる(Rf.ETS.FrameWork.Character独自の機能)
          this.sprite.ResumeAnime();
        }
      }
    }
}
```

実装内容は以下のとおりです。  
※太字は前回からの修正点です。
1. フィールドの定義  
 * sprite  
   キャラクタクラス
 * isFall  
   落下フラグ（trueで落下状態）
 * fallSpeed  
   落下スピード(2->10)
1. onInitializeメソッド（一回だけ呼ばれる）  
 * 画面サイズとfps(1秒間の描画回数)を設定
1. onResourceSettingメソッド（一回だけ呼ばれる）  
実装を追加したメソッドです。  
 * リソースのルートパスを設定する
 * リソースのキーとファイルパスの組み合わせを設定する
1. onLoadメソッド（一回だけ呼ばれる）
 1. 「sprite」フィールドの生成  
 ※Rf.ETS.FrameWork.Sprite独自の書き方
 1. リソースの設定  
 ※Rf.ETS.FrameWork.Sprite独自の書き方
 1. その他の設定  
 __※Rf.ETS.FrameWork.Character独自の機能__  
　　・キャラクタの種類(charaIndex)  
　　・キャラクタの向き(Dir)  
  __・アニメパターン(AnimePattern)__  
   設定例）AnimePattern = [0,1,0,2]  
    → 左から0番目、1番目、0番目、2番目の順番でアニメーションする  
  __・1キャラクタの画像のキャラ数(AnimeWidth)__  
   設定例）AnimeWidth = 3  
   → 今回は３種類のアニメーションのため、3を設定  
  __・初期化メソッド(Init())__  
 ※Rf.ETS.FrameWork.Character独自の機能  
  ・タップ(クリック)可能  
  ・位置を設定  
 1. イベント定義(タップ・クリックでspriteを落下させる)
 1. アニメを停止させる(Rf.ETS.FrameWork.Character独自の機能)  
 ※イベント定義(タップ・クリックでspriteを落下させる)内の処理
1. onRunメソッド（描画ごとに呼ばれる）  
　　* 歩行アニメする(Rf.ETS.FrameWork.Character独自の機能)  
  * 「落下フラグ」フィールドがtrueの場合、「sprite」フィールドを落下させる。  
  * 画面下まで落下したら
   * もとの場所に戻し、「落下フラグ」フィールドをfalseに設定する。  
   * アニメを再開させる(Rf.ETS.FrameWork.Character独自の機能)

3.```npm run build``` または ```gulp default```でビルドを行います。

# おわりに
今回はより簡単にキャラクターのグラフィックを利用できるように修正しました。  
次回はマップを表示します。

<br>
よかったらクリックしてください。  
<a href="http://it.blogmura.com/"><img src="http://it.blogmura.com/img/it88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ＩＴ技術ブログへ" /></a>  
<a href="http://game.blogmura.com/game_work/"><img src="http://game.blogmura.com/game_work/img/game_work88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ゲームブログ ゲーム制作へ" /></a><br /><a href="http://game.blogmura.com/game_work/">にほんブログ村</a>
