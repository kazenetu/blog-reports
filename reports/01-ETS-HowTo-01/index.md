TypeScriptでenchant.jsを使ってサンプルを作ってみる その1

# はじめに
TypeScriptでenchant.jsを開発するためのライブラリ「ets-framework」を作成しました。  
[https://github.com/kazenetu/enchantjs-typescript](https://github.com/kazenetu/enchantjs-typescript)  
「starter/use-framework/template/」を使ってサンプルプログラムを開発してみます。

# 今回のゴール
サンプル「template」のビルド環境を構築する

## ソースコード
[https://github.com/kazenetu/blog-reports/tree/master/reports/01-ETS-HowTo-01/template](https://github.com/kazenetu/blog-reports/tree/master/reports/01-ETS-HowTo-01/template)

# 開発環境
下記がインストールされている前提です。  
カッコ内は私の環境です。  
* Node.js（5.6.0以上）
* npm(3以上)

# ビルド環境を構築手順
1. templateフォルダのコピー  
   スターターキット(starter.zip)をダウンロードして展開し、「./use-framework/template」を好きなところにコピーしてください。  
1. ```npm install``` を行い、必要なモジュールをダウンロードしてください。
1. ```npm run build``` または ```gulp default```を行い、main.tsをビルドしmain.jsを作成します。

ビルド環境の構築が終わりました。  
以降は```npm run build``` または ```gulp default```でビルドを行います。

# おわりに
今回はビルド環境の構築を行いました。  
次回からコーディングを行います。

よかったらクリックしてください。  
<a href="http://it.blogmura.com/"><img src="http://it.blogmura.com/img/it88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ＩＴ技術ブログへ" /></a>  
<a href="http://game.blogmura.com/game_work/"><img src="http://game.blogmura.com/game_work/img/game_work88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ゲームブログ ゲーム制作へ" /></a><br /><a href="http://game.blogmura.com/game_work/">にほんブログ村</a>
