[WIP]TypeScriptでenchant.jsを使ってサンプルを作ってみる その2

# はじめに
TypeScriptでenchant.jsを開発するためのライブラリ「ets-framework」を作成しました。  
[https://github.com/kazenetu/enchantjs-typescript](https://github.com/kazenetu/enchantjs-typescript)  
「starter/use-framework/template/」を使ってサンプルプログラムを開発しています。

# 今回のゴール
「Hello world」を表示します。

##  前提
ビルド環境の構築を参照して、下記を実行してください。  
・ templateフォルダの展開  
・ ```npm install```の実行  

## ソースコード
[https://github.com/kazenetu/blog-reports/tree/master/reports/02-ETS-HowTo-02/template](https://github.com/kazenetu/blog-reports/tree/master/reports/02-ETS-HowTo-02/template)

# 開発環境
下記がインストールされている前提です。  
カッコ内は私の環境です。  
* Node.js（5.6.0以上）
* npm(3以上)

# 実装手順
1.template/main.tsを開き、Rf.ETS.FrameWork.Labelの追加を行ってください。  
※処理を追加していないメソッドは除外しています。

``` typesctipt
class GameMain extends Rf.ETS.FrameWork.GameMain {
    //TODO プロパティやフィールドを記述してください。
    private hellow:Rf.ETS.FrameWork.Label = null;

    /**
     * 初期化イベント
     * @method
     * @name FrameWork.GameMain#onInitialize
     */
    protected onInitialize(): void {
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
    protected onLoad(parent: enchant.Group): void {
        //ラベルを生成
        this.hellow = new Rf.ETS.FrameWork.Label(parent);
        this.hellow.text = "Hello world";
        this.hellow.width = 100;
        this.hellow.touchEnabled = false;
        this.hellow.textAlign = "center";
        this.hellow.x = 100;
        this.hellow.y = 0;

        //TODO イベントを記述してください。

    }

    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    protected onRun(): void {
        //ラベルを移動させる
        this.hellow.y += 4;
        if(this.hellow.y > 480){
          this.hellow.y -= 480;
        }
    }
}

```
実装内容は以下のとおりです。
1. GameMainクラスに「hellow」フィールドを追加
1. onInitializeメソッド（一回だけ呼ばれる）  
今回) 画面サイズとfps(1秒間の描画回数)を設定
1. onLoadメソッド（一回だけ呼ばれる）  
今回) 「hellow」フィールドの生成・設定
1. onRunメソッド（描画ごとに呼ばれる）  
今回) 「hellow」フィールドの移動(上から下に移動。下まで行ったら0に戻す)

2.```npm run build``` または ```gulp default```でビルドを行います。

# おわりに
今回はラベルの生成と表示を行いました。  
次回はイベントの実装を行います。

<br>
よかったらクリックしてください。  
<a href="http://it.blogmura.com/"><img src="http://it.blogmura.com/img/it88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ＩＴ技術ブログへ" /></a>  
<a href="http://game.blogmura.com/game_work/"><img src="http://game.blogmura.com/game_work/img/game_work88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ゲームブログ ゲーム制作へ" /></a><br /><a href="http://game.blogmura.com/game_work/">にほんブログ村</a>
