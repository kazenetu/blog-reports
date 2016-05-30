[WIP]TypeScriptでenchant.jsを使ってサンプルを作ってみる その4

# はじめに
TypeScriptでenchant.jsを開発するためのライブラリ「ets-framework」を作成しました。  
[https://github.com/kazenetu/enchantjs-typescript](https://github.com/kazenetu/enchantjs-typescript)  
「starter/use-framework/template/」を使ってサンプルプログラムを開発しています。

# 今回のゴール
[前回のソース](http://kazenetu.exblog.jp/22858195/)を修正して、タップ(またはクリック)すると落下するグラフィックを表示します。

##  前提
[ビルド環境の構築](http://kazenetu.exblog.jp/22812282/)を参照して、下記を実行してください。  
・ templateフォルダの展開  
・ ```npm install```の実行  

## ソースコード
[https://github.com/kazenetu/blog-reports/tree/master/reports/04-ETS-HowTo-04/template](https://github.com/kazenetu/blog-reports/tree/master/reports/04-ETS-HowTo-04/template)

# 開発環境
下記がインストールされている前提です。  
カッコ内は私の環境です。  
・Node.js（5.6.0）  
・npm(3.8.3)  

# 実装手順
1.template/assets/resources/ に 表示させるグラフィック(chara.png)を追加してください。  
![表示させるグラフィック](./template/assets/resources/chara.png)

2.template/main.tsを開き、下記の実装をしてください。
※処理を追加していないメソッドは除外しています。

``` typesctipt
class GameMain extends Rf.ETS.FrameWork.GameMain {
    //フィールド
    private sprite: Rf.ETS.FrameWork.Sprite = null; //※1
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
        this.resourceManager.AddResourceName("charaImage", "chara.png");
    }

    /**
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    protected onLoad(parent: enchant.Group): void { //※4
        //グラフィックを生成
        this.sprite = new Rf.ETS.FrameWork.Sprite(32, 32, parent); //※4.1
        //イメージの設定(Rf.ETS.FrameWork.Sprite独自の機能)
        this.sprite.FileName = this.resourceManager.GetResourceName("charaImage"); //※4.2
        //その他の情報の設定(enchant.js共通） //※4.3
        this.sprite.originX = 16; //中心で回転するように設定
        this.sprite.originY = 16; //中心で回転するように設定
        this.sprite.frame = 26 * 2; //サンプル画像で正面画像を表示する
        this.sprite.touchEnabled = true;
        this.sprite.x = 100;
        this.sprite.y = 100;

        //グラフィックのタップで落下するイベント //※4.4
        this.sprite.on(enchant.Event.TOUCH_END,(e:enchant.Event)=>{
          if(this.isFall === false){
            this.isFall = true;
            this.fallSpeed = 2;
          }
        });
    }

    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    protected onRun(): void { //※5
        //タップされた場合はグラフィックを落下させる
        if(this.isFall){
          this.sprite.y += this.fallSpeed;
          if(this.fallSpeed < 10){
            this.fallSpeed += 1;
          }
          if(this.sprite.y > 480){
            this.sprite.y = 100;
            this.isFall = false;
          }
        }
    }
}
```

実装内容は以下のとおりです。  
※太字は前回からの修正点です。
1. フィールドの定義  
 * sprite  
   グラフィック(スプライト)クラス
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
 ※enchant.jsと同じ書き方
 1. イベント定義(タップ・クリックでspriteを落下させる)
1. onRunメソッド（描画ごとに呼ばれる）  
  * 「落下フラグ」フィールドがtrueの場合、「sprite」フィールドを落下させる。  
  * 画面下まで落下したらもとの場所に戻し、「落下フラグ」フィールドをfalseに設定する。  

3.```npm run build``` または ```gulp default```でビルドを行います。

# おわりに
今回はイベントの実装を行いました。  
次回はマップデータの読み込みと表示を行います。

<br>
よかったらクリックしてください。  
<a href="http://it.blogmura.com/"><img src="http://it.blogmura.com/img/it88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ＩＴ技術ブログへ" /></a>  
<a href="http://game.blogmura.com/game_work/"><img src="http://game.blogmura.com/game_work/img/game_work88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ゲームブログ ゲーム制作へ" /></a><br /><a href="http://game.blogmura.com/game_work/">にほんブログ村</a>
