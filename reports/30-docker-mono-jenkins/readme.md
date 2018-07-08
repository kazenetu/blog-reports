# 「Jenkins+.NET Core」のDockerfileにmonoを追加する
- [「Jenkins+.NET Core」のイメージをDockerfileで定義する](https://github.com/kazenetu/blog-reports/tree/master/reports/25-dockerfile/readme.md)
- [「Jenkins+.NET Core」を実行し.NET Coreのテストジョブを作成、実行する](https://github.com/kazenetu/blog-reports/blob/master/reports/26-docker-jenkins-dotnet/readme.md)
- [「Jenkins+.NET Core」のDockerfileを.NET Core2.1に対応してみる](https://github.com/kazenetu/blog-reports/blob/master/reports/27-docker-jenkins-dotnet21/readme.md)
- [「mono+.NET Core」のDockerfileでWindowsFomsをビルドする](https://github.com/kazenetu/blog-reports/blob/master/reports/29-docker-mono-dot/readme.md)
- 「Jenkins+.NET Core」のDockerfileにmonoを追加する

## はじめに
[前回](https://github.com/kazenetu/blog-reports/blob/master/reports/29-docker-mono-dot/readme.md)はWindows以外のOSでWindowsFomsをビルドするためにmonoを利用しました。  
今回は「「Jenkins+.NET Core」のDockerfile」にmonoのインストールを追加してみます。

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

      # Add the Mono repository
      RUN apt install -y apt-transport-https dirmngr
      RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
      RUN apt update

      # install mono
      RUN apt install -y mono-devel

      USER jenkins
    ```
    実装内容
    * 「Jenkins+.NET Core」にmonoをインストールする
1. Dockerfileをビルドする(イメージ名をmono_dot_jenkins:latestとする)  
  ```sudo docker build ./ -t mono_dot_jenkins:latest```
1. ビルドしたイメージを実行する  
  ```sudo docker run --rm -p 8080:8080 -p 50000:50000 -d -t --name mono_dot_jenkins -v /vagrant/volume/mono_dot_jenkins:/var/jenkins_home mono_dot_jenkins```
1. ゲスト(CentOS)でJenkinsのキーコードを取得する  
  ```sudo docker exec mono_dot_jenkins cat /var/jenkins_home/secrets/initialAdminPassword```
1. ブラウザで```localhost:8080```にアクセスし、下記を行う
    1. Jenkinsの初期画面が表示されるため、あらかじめ取得しておいたJenkinsのキーコードを入力する
    1. ジョブが作成可能な状態までJenkinsのセットアップを続ける
    1. monoのバージョン確認ジョブを新規作成
        1. 「item name」に```CheckMonoVersion```を設定、「フリースタイル・プロジェクトのビルド」を選択、OKをクリック
        1. ビルドに「シェルの追加」を追加  
            ```
              mono --version
            ```
        1. 保存をクリック
    1. 「ビルドの実行」をクリック
1. 検証が終わったら終了する
    1. 仮想サーバーをログアウトする  
       ```exit```
    1. 仮想サーバーを停止する  
       ```vagrant halt```

## おわりに
今回はWindowsFormsアプリケーションのビルドをJenkinsジョブで実行できる環境を作成しました。

- [今回作成したDockerfile](./Dockerfile)
