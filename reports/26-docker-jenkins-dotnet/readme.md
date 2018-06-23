<a href="#top"></a>
# 「Jenkins+.NET Core」を実行し.NET Coreのテストジョブを作成、実行する
- [「Jenkins+.NET Core」のイメージをDockerfileで定義する](https://github.com/kazenetu/blog-reports/tree/master/reports/25-dockerfile/readme.md)
- 「Jenkins+.NET Core」を実行し.NET Coreのテストジョブを作成、実行する

## はじめに
[前回](https://github.com/kazenetu/blog-reports/tree/master/reports/25-dockerfile/readme.md)はJenkinsのDockerイメージを元に.NET Core SDKをインストールしました。  
今回は[TinyServerClientFramework](https://github.com/kazenetu/TinyServerClientFramework/readme.md)のWebAPITestを実行してみます。

## 環境
- Windows10 Home  
- VirtualBox 5.2.6  
- Vagrant 2.0.2
- [前回の作業](https://github.com/kazenetu/blog-reports/tree/master/reports/25-dockerfile/readme.md)が完了している前提です。

## 手順
1. コマンドプロンプトで仮想サーバーの起動を行う  
    ```vagrant up```
1. 仮想サーバーにログインする 
    ```vagrant ssh```
1. 前回ビルドしたjenkins_dotイメージを実行する  
  ```sudo docker run -p 8080:8080 -p 50000:50000 -d -t --name jenkins_dot -v /vagrant/volume/jenkins_dot:/var/jenkins_home jenkins_dot```
1. ブラウザで```localhost:8080```にアクセスし、下記を行う
    1. MSTestプラグインのインストール
      1. 「Jenkinsの管理」をクリック
      1. 「プラグインの管理」をクリック
      1. 「利用可能」タグをクリック
      1. 「MSTest」のチェックを入れる
      1. 「ダウンロードして再起動してインストール」をクリック
    1. Test用ジョブを新規作成
        1. 「item name」に```WebAPITest```を設定、「フリースタイル・プロジェクトのビルド」を選択、OKをクリック
        1. 「ソース管理」に「Git」を選択、リポジトリに「```https://github.com/kazenetu/TinyServerClientFramework.git```」を設定  
        1. ビルドに「シェルの追加」を追加  
            ```
              cd Example/WebAPITest
              dotnet test --logger trx;
            ```
        1. ビルド後の処理に「Publish MSTest test result report」を選択
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
今回は.NET Coreのテストを行いました。  
