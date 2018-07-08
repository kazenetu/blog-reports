# 「Jenkins+.NET Core」のイメージをDockerfileで定義する
- 「Jenkins+.NET Core」のイメージをDockerfileで定義する
- [「Jenkins+.NET Core」を実行し.NET Coreのテストジョブを作成、実行する](https://github.com/kazenetu/blog-reports/blob/master/reports/26-docker-jenkins-dotnet/readme.md)
- [「Jenkins+.NET Core」のDockerfileを.NET Core2.1に対応してみる](https://github.com/kazenetu/blog-reports/blob/master/reports/27-docker-jenkins-dotnet21/readme.md)
- [「mono+.NET Core」のDockerfileでWindowsFomsをビルドする](https://github.com/kazenetu/blog-reports/blob/master/reports/29-docker-mono-dot/readme.md)
- [「Jenkins+.NET Core」のDockerfileにmonoを追加する](https://github.com/kazenetu/blog-reports/blob/master/reports/30-docker-mono-jenkins/readme.md)

## はじめに
これまでVagrantで仮想サーバーを作成しました。  
今回はDockerを使用して「Jenkinsイメージをベースに.NET Core2.0を追加する」Dockerfileを作成します。

## 環境
- Windows10 Home  
- VirtualBox 5.2.6  
- Vagrant 2.0.2

## 手順
1. [Windowsで始める仮想サーバー その2「ASP.NET Coreの動作環境作成」](https://github.com/kazenetu/blog-reports/tree/master/reports/17-dotnetTestCentOS2/readme.md)をベースにDockerをインストールするスクリプトに変更する。  
    ```
      # -*- mode: ruby -*-
      # vi: set ft=ruby :

      # All Vagrant configuration is done below. The "2" in Vagrant.configure
      # configures the configuration version (we support older styles for
      # backwards compatibility). Please don't change it unless you know what
      # you're doing.
      Vagrant.configure("2") do |config|
      ～省略～

      config.vm.provision "shell", inline: <<-SHELL
        # Docker Install
        sudo curl -fsSl https://get.docker.com/ | sh
        sudo systemctl enable docker
        sudo systemctl start docker
      SHELL
    ```
1. コマンドプロンプトで仮想サーバーの起動を行う  
    ```vagrant up```
1. Vagrantとのファイル共有を行う
    1. ホスト側で```vagrant plugin install vagrant-vbguest```を実行
    1. ゲスト(CentOS)側で```sudo yum update```を実行  
       ※少し時間がかかります。
    1. ホスト側で```vagrant reload```を実行
1. 仮想サーバーにログインする 
    ```vagrant ssh```
1. Dockerがインストールされているか確認する
    ```sudo docker --version```  
    表示例  
    ```
      [vagrant@localhost ~]$ sudo docker --version
      Docker version 18.05.0-ce, build f150324
    ```
1. ホスト側のファイル共有にDockerfileを作成する
    ```
      FROM jenkins/jenkins:lts

      ENV JAVA_OPTS=-Duser.timezone=Asia/Tokyo

      # set timezone for Java runtime arguments
      USER root

      # set timezone for OS by root
      RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

      # install dotnet-sdk-2.1.4
      RUN apt-get update
      RUN apt-get install -y curl libunwind8 gettext apt-transport-https

      RUN wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.asc.gpg
      RUN mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/
      RUN wget -q https://packages.microsoft.com/config/debian/9/prod.list
      RUN mv prod.list /etc/apt/sources.list.d/microsoft-prod.list
      RUN chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
      RUN chown root:root /etc/apt/sources.list.d/microsoft-prod.list

      #CMD /bin/sh -c apt-get update
      RUN apt-get update
      RUN apt-get install -y dotnet-sdk-2.1.4

      USER jenkins
    ```
    実装内容
    * jenkinsイメージにdotnet-sdk-2.1.4をインストールする
    * タイムゾーンをJSTに設定
1. Dockerfileをビルドする(イメージ名をjenkins_dot:latestとする)  
  ```sudo docker build /vagrant -t jenkins_dot:latest```
1. ビルドしたイメージを実行する  
  ```sudo docker run -p 8080:8080 -p 50000:50000 -d -t --name jenkins_dot -v /vagrant/volume/jenkins_dot:/var/jenkins_home jenkins_dot```
1. ゲスト(CentOS)でJenkinsのキーコードを取得する  
  ```sudo docker exec jenkins_dot cat /var/jenkins_home/secrets/initialAdminPassword```
1. ブラウザで```localhost:8080```にアクセスし、下記を行う
    1. Jenkinsの初期画面が表示されるため、あらかじめ取得しておいたJenkinsのキーコードを入力する
    1. ジョブが作成可能な状態までJenkinsのセットアップを続ける
    1. ```dotnet --version```を確認するジョブを作成する
        1. 「item name」に```DotNetVersion```を設定、「フリースタイル・プロジェクトのビルド」を選択、OKをクリック
        1. ビルドに「シェルの追加」を追加  
        ```dotnet --version```
        1. 保存をクリック
    1. 「ビルドの実行」をクリック
1. 検証が終わったら終了する
    1. jenkins_dotコンテナを終了する  
       ```sudo docker stop jenkins_dot```
    1. 仮想サーバーをログアウトする  
       ```exit```
    1. 仮想サーバーを停止する  
       ```vagrant halt```

## おわりに
これでJenkinsで.NET Coreのテストを行うための準備ができました。  
次回は.NET Coreのテストを行います。  

- [今回作成したVagrantfile](./Vagrantfile)
- [今回作成したDockerfile](./Dockerfile)

## 参考資料
* Qiita:[Docker用 Jenkins をTimezone JSTで稼働させるDockerfile](https://qiita.com/k1tajima/items/bc1d4cd24b081ad42957)
* [.NET Coreのインストール](https://www.microsoft.com/net/download/linux-package-manager/debian9/sdk-2.1.4)
