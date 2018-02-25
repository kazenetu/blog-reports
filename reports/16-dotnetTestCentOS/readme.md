# Windowsで始める仮想サーバー その1「環境作成」
- 環境作成
- [ASP.NET Coreの動作環境作成](https://github.com/kazenetu/blog-reports/tree/master/reports/17-dotnetTestCentOS2)
- [ASP.NET Coreサンプルプログラムの実行確認](https://github.com/kazenetu/blog-reports/tree/master/reports/18-dotnetTestCentOS3)

## はじめに
ASP.NET CoreのLinux系OSでの実行環境を構築できるようにします。  
今回はVirtualBoxとVagrantを使ってLinux系の仮想サーバーが作成できるようにします。

## 環境
Windows10 Home  

## 手順
1. VirtualBoxインストール
   - VirtualBoxダウンロード  
    [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)  
    ※バージョン 5.2.6を使用
1. Vagrantインストール
   - Vagrantダウンロード  
    [https://www.vagrantup.com/downloads.html](https://www.vagrantup.com/downloads.html)  
    ※バージョン2.0.2を使用
1. Vagrant用フォルダを作成
1. コマンドプロンプトでcentos7のVagrantfileを作成する  
```cd vagrantフォルダ```  
```vagrant init bento/centos-7.2```
1. コマンドプロンプトで仮想サーバーのダウンロードと実行を行う  
```vagrant up```  
1. 仮想サーバーにログインする  
```vagrant ssh```
1. ログインできることを確認したら ```exit``` でログアウトする
1. コマンドプロンプトで仮想サーバーの削除を行う  
```vagrant destroy```  

## 発生した問題と対策
- ```vagrant init centos/7``` で作成した場合、```vagrant ssh```で仮想サーバーにログインできない  
「Permission denied (publickey,gssapi-keyex,gssapi-with-mic)」と表示される  
→ ```vagrant init bento/centos-7.2``` を作成するように変更

## おわりに
まずは仮想環境を用意できるようにしました。  
次回はさらにASP.NET Coreが実行できるようにします。

[今回利用したVagrantfile](./Vagrantfile)

## 参考資料
- WEB+DB PRESS Vol.98 特集2 これから始めるDocker

