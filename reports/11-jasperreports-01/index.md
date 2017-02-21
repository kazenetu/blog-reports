[WIP]JasperReportsでPDFを出力する その1


# はじめに
JavaのWebアプリでPDFを出力するため、JasperReportsを使っています。
いくつか嵌ったポイントがあったので数回に分けて紹介したいと思います。  

今回は「EclipseプラグインのJasperstudio Studioのインストール」で嵌ったポイントと対応を紹介します。  

# 開発環境
Eclipse(pleiades4.6 Neon)

# 嵌ったポイント
「Jasperstudio Studioのインストール手順」として「EclipseマーケットプレースからJasperstudio Studioをインストール」がよく紹介されています。  
![Eclipseマーケットプレース](1_Eclipsemarket.PNG)

試してみましたが「ソリューションは使用できない」旨のメッセージが表示されてしまいます。  
（そのまま続行してもインストール中にエラーが発生します）  
![インストール失敗](2_market_ng.PNG)

# 対応方法
[https://sourceforge.net/projects/jasperstudio/files/updatesite/6.3.1/](https://sourceforge.net/projects/jasperstudio/files/updatesite/6.3.1/)で公開されているfull-site.zipをダウンロードします。  
![ダウンロードサイト](3_dl_fullsite.PNG)

----ここから----

1.  full-site.zipを展開
1.  新規ソフトウェアのインストールを開く
1. 展開したfull-siteを指定  
(チェックボックス確認)
1. インストール完了


# おわりに


よかったらクリックしてください。
<a href="http://it.blogmura.com/"><img src="http://it.blogmura.com/img/it88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ＩＴ技術ブログへ" /></a>
<a href="http://game.blogmura.com/game_work/"><img src="http://game.blogmura.com/game_work/img/game_work88_31.gif" width="88" height="31" border="0" alt="にほんブログ村 ゲームブログ ゲーム制作へ" /></a><br /><a href="http://game.blogmura.com/game_work/">にほんブログ村</a>
