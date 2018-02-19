# はじめに
[前回](https://github.com/kazenetu/blog-reports/blob/master/reports/16-dotnetTestCentOS/index.md)は仮想環境の構築を行いました。  
今回はASP.NET CoreのLinux系OSでの実行環境を構築できるようにします。

# 環境
Windows10 Home  

# 手順
実施する前に[前回](https://github.com/kazenetu/blog-reports/blob/master/reports/16-dotnetTestCentOS/index.md)を参照してください
1. Vagrantfileを編集する
   - 80番ポートをホスト(windows)側で8080ポートにマッピングする
   - .NetCore2.0のインストールを行う  
```Vagrant.configure("2") do |config|```  
```  ～省略～```  
```  config.vm.network "forwarded_port", guest: 80, host: 8080```   
```  ～省略～```  
```  config.vm.provision "shell", inline: <<-SHELL```  
```    sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc```  
```    sudo sh -c 'echo -e "[packages-microsoft-com-prod]\nname=packages-microsoft-com-prod \nbaseurl= https://packages.microsoft.com/yumrepos/microsoft-rhel7.3-prod\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/dotnetdev.repo'```  
```    sudo yum update```  
```    sudo yum install -y libunwind```  
```    sudo yum install -y libicu```  
```    sudo yum install -y dotnet-sdk-2.1.4```  
```  SHELL```  
```end```  
1. コマンドプロンプトで仮想サーバーの起動を行う  
```vagrant up```  
1. 仮想サーバーにログインする  
```vagrant ssh```
1. 下記を参考にしてApacheを設定する  
[Apache 搭載の Linux で ASP.NET Core をホストする](https://docs.microsoft.com/ja-jp/aspnet/core/host-and-deploy/linux-apache?tabs=aspnetcore2x)  
※注意点：  
   -  ファイアウォールの設定を行う
      1. sudo firewall-cmd --add-port=80/tcp --permanentを実行する
      1. sudo firewall-cmd --reloadを実行する
1. ログイン後、以下のコマンドを発行する
   1. フォルダを作成する  
     ```mkdir coretest```
   1. サンプルプロジェクトを作成する  
     ```cd coretest```  
     ```dotnet new mvc```
   1. サンプルプロジェクトを実行する  
     ```dotnet run```  
1. Windowsのブラウザで ```http://localhost:8080/```にアクセスし、core MVCの画面が表示されることを確認する
1. 動作確認したら ```exit``` でログアウトする
1. コマンドプロンプトで仮想サーバーの停止を行う  
```vagrant halt```  

# 発生した問題と対策
- ファイル共有ができない  
  → ホスト側で```vagrant plugin install vagrant-vbguest```を実行する  
  → ゲスト(CentOS)側で```sudo yum update```を実行する      
  → ホスト側で```vagrant reload```を実行する  

# おわりに
とりあえずASP.NET Coreが実行できるようになりました。  
次回はwindowsでの動作確認のみ実施済みの[https://github.com/kazenetu/ASPdotNETCoreTest](https://github.com/kazenetu/ASPdotNETCoreTest)が  
CentOSで動作するか確認します。

# 参考資料
- Qiita:[Vagrant ファイル共有　決定版](https://qiita.com/yusk24/items/96a0000716fed7ca62f6)
- Qiita:[vagrant up 時の共有フォルダのマウントエラー解消方法](https://qiita.com/takutoki/items/33cf1230e032931f9adc)