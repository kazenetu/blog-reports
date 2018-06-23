# Windowsで始める仮想サーバー その3<br>「ASP.NET Coreサンプルプログラムの実行確認」

- [環境作成](https://github.com/kazenetu/blog-reports/tree/master/reports/16-dotnetTestCentOS/readme.md)
- [ASP.NET Coreの動作環境作成](https://github.com/kazenetu/blog-reports/tree/master/reports/17-dotnetTestCentOS2/readme.md)
- ASP.NET Coreサンプルプログラムの実行確認
- [PDF出力の環境作成](https://github.com/kazenetu/blog-reports/tree/master/reports/19-dotnetTestCentOS4/readme.md)
- [ASP.NET CoreでPDF出力](https://github.com/kazenetu/blog-reports/tree/master/reports/20-dotnetTestCentOS5/readme.md)

## はじめに
[前回](https://github.com/kazenetu/blog-reports/tree/master/reports/17-dotnetTestCentOS2/readme.md)はASP.NET CoreのLinux系OSでの実行環境を構築しました。  
今回はwindowsでの動作確認のみ実施済みの[https://github.com/kazenetu/ASPdotNETCoreTest](https://github.com/kazenetu/ASPdotNETCoreTest)が  
CentOSで動作するか確認します。

## 環境
- Windows10 Home  
- VirtualBox 5.2.6  
- Vagrant 2.0.2
- .Net Core SDK 2.1.4

## 手順
ファイル共有を前提の手順となっています。  
実施する前に[前回](https://github.com/kazenetu/blog-reports/tree/master/reports/17-dotnetTestCentOS2/readme.md)の「発生した問題と対策」を実施してください。
1. Windowsでの作業：サンプルプログラムをダウンロードまたはCloneする
[https://github.com/kazenetu/ASPdotNETCoreTest](https://github.com/kazenetu/ASPdotNETCoreTest)
1. Windowsでの作業：サンプルプログラムの「WebApi」フォルダに移動する
1. Windowsでの作業：Windows上でLinux展開用ファイル群を作成する  
```dotnet publish --configuration Release --self-contained -r centos.7-x64```
1. Windowsでの作業：Vagrantfileのフォルダに「ASPdotNETCoreTest」フォルダを作成する
```WebApi\bin\Release\netcoreapp2.0\centos.7-x64\publish```
1. Windowsでの作業：「ASPdotNETCoreTest」フォルダに以下のフォルダの中身をコピーする  
```WebApi\bin\Release\netcoreapp2.0\centos.7-x64\publish```
1. Windowsでの作業：暫定的に動作させるために設定ファイルの置き換えを行う  
   ※DBにSQLiteを利用するようにする
   1. 「appsettings.json」を削除する
   1. 「appsettings.Development.json」を「appsettings.json」にリネームする
1. Windowsでの作業：コマンドプロンプトで仮想サーバーの起動を行う  
```vagrant up```  
1. Windowsでの作業：仮想サーバーにログインする  
```vagrant ssh```
1. 仮想サーバーでの作業：共有ディレクトリの「ASPdotNETCoreTest」ディレクトリに移動する  
```cd /vagrant/ASPdotNETCoreTest```
1. 仮想サーバーでの作業：プログラム(webApi.dll)を実行する  
```dotnet WebApi.dll```  
1. 仮想サーバーでの作業：下記のメッセージが表示されることを確認する  
```Hosting environment: Production```  
```Content root path: /vagrant/ASPdotNETCoreTest```  
```Now listening on: http://localhost:5000```  
```Application started. Press Ctrl+C to shut down.```  
1. Windowsでの作業：ブラウザを立ち上げ、 ```http://localhost:8080/```にアクセスする  
   下記の操作ができることを確認する
   1. ログイン画面が表示される
   1. test/testでログインする
   1. ユーザーマスタ検索で検索する
1. 「Ctrl+C」を押してプログラム(webApi.dll)の実行を終了する
1. 動作確認したら ```exit``` でログアウトする
1. コマンドプロンプトで仮想サーバーの停止を行う  
```vagrant halt```  

## おわりに
windowsでの動作確認のみ実施済みの[https://github.com/kazenetu/ASPdotNETCoreTest](https://github.com/kazenetu/ASPdotNETCoreTest)が  
CentOSで動作するか確認しました。  
