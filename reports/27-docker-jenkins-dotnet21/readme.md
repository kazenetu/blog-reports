# 「Jenkins+.NET Core」のDockerfileを.NET Core2.1に対応してみる
- [「Jenkins+.NET Core」のイメージをDockerfileで定義する](https://github.com/kazenetu/blog-reports/tree/master/reports/25-dockerfile/readme.md)
- [「Jenkins+.NET Core」を実行し.NET Coreのテストジョブを作成、実行する](https://github.com/kazenetu/blog-reports/blob/master/reports/26-docker-jenkins-dotnet/readme.md)
- 「Jenkins+.NET Core」のDockerfileを.NET Core2.1に対応してみる
- [「mono+.NET Core」のDockerfileでWindowsFomsをビルドする](https://github.com/kazenetu/blog-reports/blob/master/reports/29-docker-mono-dot/readme.md)

## はじめに
[「Jenkins+.NET Core」のイメージをDockerfileで定義する](https://github.com/kazenetu/blog-reports/tree/master/reports/25-dockerfile/readme.md)では.NET Core2.0をインストールしました。  
今回は.NET Core2.1をインストールしてみます。

## 環境
- Windows10 Home  
- VirtualBox 5.2.6  
- Vagrant 2.0.2

## 手順
1. [「Jenkins+.NET Core」のイメージをDockerfileで定義する](https://github.com/kazenetu/blog-reports/tree/master/reports/25-dockerfile/readme.md)のVagrantfileをコピーする
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
   ※前回と相違点は「dotnet-sdk-2.1.4」→「dotnet-sdk-2.1」
    ```
      FROM jenkins/jenkins:lts

      ENV JAVA_OPTS=-Duser.timezone=Asia/Tokyo

      # set timezone for Java runtime arguments
      USER root

      # set timezone for OS by root
      RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

      # install dotnet-sdk-2.1
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
      RUN apt-get install -y dotnet-sdk-2.1

      USER jenkins
    ```
    実装内容
    * jenkinsイメージにdotnet-sdk-2.1をインストールする
    * タイムゾーンをJSTに設定
1. Dockerfileをビルドする(イメージ名をjenkins_dot:latestとする)  
  ```sudo docker build /vagrant -t jenkins_dot:latest```
1. ビルドしたイメージを実行する  
  ```sudo docker run -p 8080:8080 -p 50000:50000 -d -t --name jenkins_dot -v /vagrant/volume/jenkins_dot:/var/jenkins_home jenkins_dot```
1. 以降は前回以前と同じ
1. 検証が終わったら終了する
    1. jenkins_dotコンテナを終了する  
       ```sudo docker stop jenkins_dot```
    1. 仮想サーバーをログアウトする  
       ```exit```
    1. 仮想サーバーを停止する  
       ```vagrant halt```

## おわりに
.NET Coreのバージョンアップを行うことができました。
.NET Core2.1 LTSが来たときのバージョンアップも比較的容易に行えそうです。

- [今回作成したDockerfile](./Dockerfile)

## 参考資料
* Microsoft:[Install .NET Core 2.1 SDK (v2.1.301) on Linux Debian 9](https://www.microsoft.com/net/download/linux-package-manager/debian9/sdk-2.1.301)