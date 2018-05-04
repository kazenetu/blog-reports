# wkhtmltopdfを使ってSWAGGER UIのPDFを作成する
- [ASP.NET Core2でSWAGGER UIを使う](https://github.com/kazenetu/blog-reports/tree/master/reports/22-swaggerUI)
- wkhtmltopdfを使ってSWAGGER UIのPDFを作成する

## はじめに
[前回はWebAPIのドキュメントを自動生成するSWAGGER UI](https://github.com/kazenetu/blog-reports/tree/master/reports/22-swaggerUI)を紹介しました。  
しかし、このままではWebサーバーを立ち上げない限りWebAPIドキュメントを確認できません。

今回はwkhtmltopdfを実行し、PDFファイルに出力する方法をご紹介します。

完全なサンプルコードは[sampleフォルダ](https://github.com/kazenetu/blog-reports/tree/master/reports/23-swaggerUItoPDF/sample)をご覧ください。

## 環境
- Windows10 Home  
- .Net Core SDK 2.1.4
- wkhtmltopdf 0.12.4 (with patched qt)

## 手順
[前回のサンプルコード](https://github.com/kazenetu/blog-reports/tree/master/reports/22-swaggerUI/sample)を利用します。
1. wkhtmltopdfのインストール
   - Windowsの場合
      1. wkhtmltopdfのインストール
         1. [https://wkhtmltopdf.org/downloads.html](https://wkhtmltopdf.org/downloads.html)からOSと32bit・64bitを選択してダウンロード  
         (Windowsの場合は「Windows(MinGW)」を選択)
         1. ダウンロードしたファイルを実行し、インストール
      1. wkhtmltopdfのbinフォルダにパスを通す
          1. Windowsシステムツールのシステムを選択
          1. システムを選択
          1. システムの詳細設定をクリック
          1. ダイアログ下部の環境変数をクリック
          1. システム環境変数のPathを選択
          1. 編集をクリック
          1. インストールフォルダのbinフォルダのパスを追加  
          例)C:\Program Files\wkhtmltopdf\bin
          1. OKを押して閉じる
   - CentOSの場合
      1. wkhtmltopdfをインストールする  
      ```sudo yum -y install epel-release ```  
      ```sudo yum -y install wkhtmltopdf```  
      1. 日本語フォントをインストールする  
      ```sudo yum -y install ipa-gothic-fonts ipa-mincho-fonts ipa-pgothic-fonts ipa-pmincho-fonts```

1. WebAPIをコピーする  
  [前回のサンプルコード](https://github.com/kazenetu/blog-reports/tree/master/reports/22-swaggerUI/sample)をコピーしてきます。
1. プロジェクトファイルのルートフォルダにswaggerUI用HTML(swaggerIndex.html)を追加します。

   ※ここではポイントを説明ます。  
  　htmlファイル全体は[GitHub](https://github.com/kazenetu/blog-reports/blob/master/reports/23-swaggerUItoPDF/sample/webapi/swaggerIndex.html)を参照してください。  
  　また、このHTMLはGitHubの[Swashbuckle.AspNetCore/src/Swashbuckle.AspNetCore.SwaggerUI/index.html](https://github.com/domaindrivendev/Swashbuckle.AspNetCore/blob/master/src/Swashbuckle.AspNetCore.SwaggerUI/index.html)をベースとしています。

   - headタグ内にPolyfill用jsの読み込みを追加
   ```
    <head>
      ～中略～

      <!-- Polyfills for wkhtmltopdf -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.10/es5-shim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/es6-shim/0.35.3/es6-sham.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/es7-shim/6.0.0/es7-shim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.min.js"></script>

      ～中略～
    </head>
   ```
   - WebAPIの展開を設定  
   ```configObject.docExpansion = 'full';```を追加する
   ```
    <script>
      window.onload = function () {
        var configObject = JSON.parse('%(ConfigObject)');
        var oauthConfigObject = JSON.parse('%(OAuthConfigObject)');

        // Apply mandatory parameters
        configObject.dom_id = "#swagger-ui";
        configObject.presets = [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset];
        configObject.layout = "StandaloneLayout";
        configObject.docExpansion = 'full'; // 追加

        // If oauth2RedirectUrl isn't specified, use the built-in default
        if (!configObject.hasOwnProperty("oauth2RedirectUrl"))
          configObject.oauth2RedirectUrl = window.location.href.replace("index.html", "oauth2-redirect.html");

        // Build a system
        const ui = SwaggerUIBundle(configObject);

        // Apply OAuth config
        ui.initOAuth(oauthConfigObject);
      }
    </script>
   ```   
1. デバッグ実行
   1. ```dotnet run```を実行  
   1. ```ルートパス/swagger/```にアクセスし、WebAPIドキュメントが表示されることを確認  
1. コマンドプロンプトなどで下記を実行
   ```   
    cd PDF出力先
    wkhtmltopdf - ルートパス/swagger/ 出力PDF名.pdf
   ```   
   ※*PDF出力先* フォルダに *出力PDF名*.pdf が出力される


## おわりに
PDFとしてWebAPIドキュメントを残すことができました。  
コマンドプロンプトやシェルで実行できるため、CIに組み込むこともできますね。

## 参考
wkhtmltopdfのインストール
- Windows
  - [DinkToPdfを使ってみた](https://github.com/kazenetu/dotNETCoreTest/blob/master/useDinkToPdf.md)
- CentOS7
  - [Windowsで始める仮想サーバー その4「PDF出力の環境作成」](https://github.com/kazenetu/blog-reports/tree/master/reports/19-dotnetTestCentOS4)

Polyfills設定
- wkhtmltopdf/wkhtmltopdf issue
  - [Wkhtmltopdf not generating my ReactJs App](https://github.com/wkhtmltopdf/wkhtmltopdf/issues/2952)