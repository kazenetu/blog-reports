# 「mono+.NET Core」のDockerfileでWindowsFomsをビルドする
- [「Jenkins+.NET Core」のイメージをDockerfileで定義する](https://github.com/kazenetu/blog-reports/tree/master/reports/25-dockerfile/readme.md)
- [「Jenkins+.NET Core」を実行し.NET Coreのテストジョブを作成、実行する](https://github.com/kazenetu/blog-reports/blob/master/reports/26-docker-jenkins-dotnet/readme.md)
- [「Jenkins+.NET Core」のDockerfileを.NET Core2.1に対応してみる](https://github.com/kazenetu/blog-reports/blob/master/reports/27-docker-jenkins-dotnet21/readme.md)
- 「mono+.NET Core」のDockerfileでWindowsFomsをビルドする

## はじめに
Windows以外のOSでWindowsFomsをビルドするためにmonoを利用してみます。  
単純なWindowsFomsであれば、問題なくビルドできますが
[TinyServerClientFramework](https://github.com/kazenetu/TinyServerClientFramework/)の[Example](https://github.com/kazenetu/TinyServerClientFramework/tree/master/Example)のようにnetstandardのプロジェクトを参照しているとビルドエラーが発生します。  
今回はmonoのDockerイメージを元に.NET Coreをインストールして解決します。

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
        FROM mono

        USER root

        # install dotnet-sdk-2.1.4
        RUN apt-get update
        RUN apt-get install -y curl libunwind8 gettext apt-transport-https

        RUN apt-get install -y wget

        RUN wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.asc.gpg
        RUN mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/
        RUN wget -q https://packages.microsoft.com/config/debian/8/prod.list
        RUN mv prod.list /etc/apt/sources.list.d/microsoft-prod.list
        RUN chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
        RUN chown root:root /etc/apt/sources.list.d/microsoft-prod.list

        #CMD /bin/sh -c apt-get update
        RUN apt-get update
        RUN apt-get install -y dotnet-sdk-2.1.4
    ```
    実装内容
    * monoイメージにdotnet-sdk-2.1.4(.NET Core2.0)をインストールする
1. Dockerfileをビルドする(イメージ名をmono_dot:latestとする)  
  ```sudo docker build /vagrant -t mono_dot:latest```
1. ビルドしたイメージを実行する  
  ```sudo docker run --rm -v /vagrant/volume/mono_dot:/home/sample -i -t mono_dot /bin/bash```

1. ソースコードをビルドする
    1. ローカルPCにて下記を実施する
        1. [TinyServerClientFramework](https://github.com/kazenetu/TinyServerClientFramework/)の[Example](https://github.com/kazenetu/TinyServerClientFramework/tree/master/Example)を```/vagrant/volume/mono_dot``` にコピーする
        1. ```Client/Program.cs``` をClickOnce部分をコメントアウトする
        ```
        using Client.Forms;
        using Framework.Client.BaseClasses;
        using System;
        // using System.Deployment.Application; // ※ClickOnce部分をコメントアウト
        using System.Windows.Forms;

        namespace Client
        {
            static class Program
            {
            /// <summary>
            /// アプリケーションのメイン エントリ ポイントです。
            /// </summary>
            [STAThread]
            static void Main()
            {
                // ※ClickOnce部分をコメントアウト
                /* 
                if (ApplicationDeployment.IsNetworkDeployed)
                {
                // BusinessBaseのWebAPIのベースURLに「ClickOnce実行時のURL」を設定
                var updateLocation = ApplicationDeployment.CurrentDeployment.UpdateLocation;
                BussinessBase.WebAPIBaseUrl = 
                string.Format("{0}://{1}:{2}/", updateLocation.Scheme, updateLocation.Host, updateLocation.Port);
                }
                */

                Application.EnableVisualStyles();
                Application.SetCompatibleTextRenderingDefault(false);
                Application.Run(new OrderListForm());
            }
          }
        }
        ```
    1. mono_dotコンテナで下記を実施する
        1. Example/Clientディレクトリに移動する  
           ```cd /home/sample/Example/Client```
        1. ビルドを実行  
           ```msbuild Client.csproj -r```
1. 検証が終わったら終了する
    1. 仮想サーバーをログアウトする  
       ```exit```
    1. 仮想サーバーを停止する  
       ```vagrant halt```

## VisualStudioとMonoでClickOnceの設定切替
Define設定と#ifでClickOnce関係の設定を切り替えることができる。  
1. Client/Client.csprojの編集  
   PropertyGroupの最後に下記を追加
   ```
    <PropertyGroup Condition="'$(OS)' == 'Windows_NT'">
        <DefineConstants>$(DefineConstants);WIN</DefineConstants>
    </PropertyGroup>
   ```
   ※Windows(Windows_NT)で動作しているときのみWINを設定する

1. Client/Program.csの編集
   ```
    using Client.Forms;
    using Framework.Client.BaseClasses;
    using System;
    #if WIN // 追加
    using System.Deployment.Application;
    #endif // 追加
    using System.Windows.Forms;

    namespace Client
    {
        static class Program
        {
        /// <summary>
        /// アプリケーションのメイン エントリ ポイントです。
        /// </summary>
        [STAThread]
        static void Main()
        {
            #if WIN // 追加
            if (ApplicationDeployment.IsNetworkDeployed)
            {
            // BusinessBaseのWebAPIのベースURLに「ClickOnce実行時のURL」を設定
            var updateLocation = ApplicationDeployment.CurrentDeployment.UpdateLocation;
            BussinessBase.WebAPIBaseUrl = 
            string.Format("{0}://{1}:{2}/", updateLocation.Scheme, updateLocation.Host, updateLocation.Port);
            }
            #endif // 追加

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new OrderListForm());
        }
      }
    }
   ```
   ※Windowsの場合はClickOnceの設定を有効化する

## おわりに
netstandardのプロジェクトを参照しているWindowsFormsアプリケーションのビルドができました。  
WindowsFormsアプリケーションの実行は難しいですが、テスト環境へのデプロイはできそうですね。  

- [今回作成したDockerfile](./Dockerfile)
