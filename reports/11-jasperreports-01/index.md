JasperReportsでPDFを出力する その1


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
1.  [https://sourceforge.net/projects/jasperstudio/files/updatesite/6.3.1/](https://sourceforge.net/projects/jasperstudio/files/updatesite/6.3.1/)で公開されているfull-site.zipをダウンロードします。  
![ダウンロード](3_dl_fullsite.PNG)

1.  ダウンロードしたfull-site.zipを展開します。
![ダウンロード](4_unzip.PNG)

1.  Eclipseの新規ソフトウェアのインストールを開き、追加ボタンをクリックします。
![ソフトウェアのインストール](5_addsoft.PNG)

1. リポジトリの追加で「ローカル」を選択します。  
展開したfull-siteを指定します。  
さらに名前を入力し、OKをクリックしてください。
![リポジトリの追加](6_addrepo.PNG)

1. 「Business Inteligence,Reporting Tools」を選択し次へボタンをクリックします。
![ソフトウェアの選択](7_selectfile.PNG)
セキュリティ警告が出ますが、OKボタンをクリックしてください。
![警告メッセージ](8_warnmsg.PNG)

1. Eclipseを再起動してインストール完了です。  
![終了](9_finish.PNG)

# おわりに
Eclipseプラグインをインストールするのも一苦労でした。  
さらっとインストールできるようになりたいなぁ。  
