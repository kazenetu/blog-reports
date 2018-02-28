# [WIP]Windowsで始める仮想サーバー その4「PDF出力の環境作成」

- [環境作成](https://github.com/kazenetu/blog-reports/tree/master/reports/16-dotnetTestCentOS)
- [ASP.NET Coreの動作環境作成](https://github.com/kazenetu/blog-reports/tree/master/reports/17-dotnetTestCentOS2)
- [ASP.NET Coreサンプルプログラムの実行確認](https://github.com/kazenetu/blog-reports/tree/master/reports/18-dotnetTestCentOS3)
- PDF出力の環境作成

## はじめに
ASP.NET CoreでPDF出力を出力できる環境を作成します。  
今回はwkhtmltopdfをCentOSにインストールします。

## 環境
- Windows10 Home  
- VirtualBox 5.2.6  
- Vagrant 2.0.2
- .Net Core SDK 2.1.4

## 手順
1. Windowsでの作業：コマンドプロンプトで仮想サーバーの起動を行う  
```vagrant up```  
1. Windowsでの作業：仮想サーバーにログインする  
```vagrant ssh```
1. 仮想サーバーでの作業：wkhtmltopdfをインストールする  
```sudo yum -y install epel-release ```  
```sudo yum -y install wkhtmltopdf```  
1. 仮想サーバーでの作業：日本語フォントをインストールする  
```sudo yum -y install ipa-gothic-fonts ipa-mincho-fonts ipa-pgothic-fonts ipa-pmincho-fonts```
1. 仮想サーバーでの作業：wkhtmltopdfの動作確認を行う
```wkhtmltopdf --version```  
「wkhtmltopdf 0.12.1」と表示されればインストール完了
1. 確認したら ```exit``` でログアウトする
1. コマンドプロンプトで仮想サーバーの停止を行う  
```vagrant halt```  

## おわりに
今回はPDF出力環境を作成しました。  
次回はASP.NET CoreでPDF出力できるようにします。

## 参考
- [どこかに向かうらしい話：「シェルプログラミング実用テクニック」 CentOS7向け補足事項(1章～4章)](http://hiroto1979.hatenablog.jp/entry/2016/09/29/223832)