TypeScriptでenchant.jsを使ってサンプルを作ってみる その3

# はじめに
TypeScriptでenchant.jsを開発するためのライブラリ「ets-framework」を作成しました。  
[https://github.com/kazenetu/enchantjs-typescript](https://github.com/kazenetu/enchantjs-typescript)  
「starter/use-framework/template/」を使ってサンプルプログラムを開発しています。

# 今回のゴール
タップ(またはクリック)すると落下する「Hello world」を表示します。

##  前提
[ビルド環境の構築](http://kazenetu.exblog.jp/22812282/)を参照して、下記を実行してください。  
・ templateフォルダの展開  
・ ```npm install```の実行  

## ソースコード
[https://github.com/kazenetu/blog-reports/tree/master/reports/03-ETS-HowTo-03/template](https://github.com/kazenetu/blog-reports/tree/master/reports/03-ETS-HowTo-03/template)

# 開発環境
下記がインストールされている前提です。  
カッコ内は私の環境です。  
・Node.js（5.6.0）  
・npm(3.8.3)  

# 実装手順
1.template/main.tsを開き、下記の実装をしてください。
※処理を追加していないメソッドは除外しています。

``` typesctipt
class GameMain extends Rf.ETS.FrameWork.GameMain {
    //TODO プロパティやフィールドを記述してください。
    private hellow:Rf.ETS.FrameWork.Label = null; //※1
    private isFall:boolean = false; //※1
    private fallSpeed:number = 0; //※1

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
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    protected onLoad(parent: enchant.Group): void { //※3
        //ラベルを生成 //※3.1
        this.hellow = new Rf.ETS.FrameWork.Label(parent);
        this.hellow.text = "Hello world";
        this.hellow.width = 100;
        this.hellow.touchEnabled = false;
        this.hellow.textAlign = "center";
        this.hellow.x = 100;
        this.hellow.y = 100;
        this.hellow.touchEnabled = true;

        //ラベルのタップで落下するイベント //※3.2
        this.hellow.on(enchant.Event.TOUCH_END,(e:enchant.Event)=>{
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
    protected onRun(): void { //※4
        //タップされた場合はラベルを移動させる
        if(this.isFall){
          this.hellow.y += this.fallSpeed;
          if(this.fallSpeed < 10){
            this.fallSpeed += 1;
          }
          if(this.hellow.y > 480){
            this.hellow.y = 100;
            this.isFall = false;
          }
        }
    }
}
```

実装内容は以下のとおりです。
1. フィールドの定義  
 * hellow  
   ラベルクラス
 * isFall  
   落下フラグ（trueで落下状態）
 * fallSpeed  
   落下スピード(2->10)
1. onInitializeメソッド（一回だけ呼ばれる）  
 * 画面サイズとfps(1秒間の描画回数)を設定
1. onLoadメソッド（一回だけ呼ばれる）  
 1. 「hellow」フィールドの生成・設定  
    前回から追加した点は下記のコードです  
    * this.hellow.touchEnabled = true;
 1. イベント定義(タップ・クリックでラベルを落下させる)
1. onRunメソッド（描画ごとに呼ばれる）  
  * 「落下フラグ」フィールドがtrueの場合、「hellow」フィールドを落下させる。  
  * 画面下まで落下したらもとの場所に戻し、「落下フラグ」フィールドをfalseに設定する。  

2.```npm run build``` または ```gulp default```でビルドを行います。

# おわりに
今回はイベントの実装を行いました。  
次回はグラフィックの表示を行います。

<br>
よかったらクリックしてください。  
<a href="http://it.blogmura.com/"><img src="http://it.blogmura.com/img/it88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ＩＴ技術ブログへ" /></a>  
<a href="http://game.blogmura.com/game_work/"><img src="http://game.blogmura.com/game_work/img/game_work88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ゲームブログ ゲーム制作へ" /></a><br /><a href="http://game.blogmura.com/game_work/">にほんブログ村</a>
