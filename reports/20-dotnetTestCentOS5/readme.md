# Windowsで始める仮想サーバー その5<br>「ASP.NET CoreでPDF出力」

- [環境作成](https://github.com/kazenetu/blog-reports/tree/master/reports/16-dotnetTestCentOS)
- [ASP.NET Coreの動作環境作成](https://github.com/kazenetu/blog-reports/tree/master/reports/17-dotnetTestCentOS2)
- [ASP.NET Coreサンプルプログラムの実行確認](https://github.com/kazenetu/blog-reports/tree/master/reports/18-dotnetTestCentOS3)
- [PDF出力の環境作成](https://github.com/kazenetu/blog-reports/tree/master/reports/19-dotnetTestCentOS4)
- ASP.NET CoreでPDF出力

## はじめに
[前回](https://github.com/kazenetu/blog-reports/tree/master/reports/19-dotnetTestCentOS4)はPDF出力できる環境を作成しました。  
今回はASP.NET CoreでPDF出力できるようにします。  
※[第2回](https://github.com/kazenetu/blog-reports/tree/master/reports/17-dotnetTestCentOS2)の手順5で作成したcoretestを使ってみます。  
　 あらかじめ仮想サーバー上で```cp coretest /vagrant/ -r```を実行して  
　ファイル共有のディレクトリにコピーするとWindows上での編集が可能になります。

## 環境
- Windows10 Home  
- VirtualBox 5.2.6  
- Vagrant 2.0.2
- .Net Core SDK 2.1.4
- wkhtmltopdf 0.12.1

## 手順
1. Windowsでの作業：コマンドプロンプトで仮想サーバーの起動を行う  
```vagrant up```  
1. Windowsでの作業：仮想サーバーにログインする  
```vagrant ssh```

1. 仮想サーバーでの作業：libwkhtmltoxの配置  
[https://github.com/rdvojmoc/DinkToPdf/tree/master/v0.12.4](https://github.com/rdvojmoc/DinkToPdf/tree/master/v0.12.4)から32bit・64bitのどちらかをダウンロードし、プロジェクト直下にコピーする。
1. 仮想サーバーでの作業：coretest.csprojを編集する  
   ※ **太文字**が追加分  
```<Project Sdk="Microsoft.NET.Sdk.Web">```  
```  <PropertyGroup>```  
```    <TargetFramework>netcoreapp2.0</TargetFramework>```  
**```    <CopyLocalLockFileAssemblies>true</CopyLocalLockFileAssemblies>```**  
```  </PropertyGroup>```  
```  <ItemGroup>```  
```    <PackageReference Include="Microsoft.AspNetCore.All" Version="2.0.5" />```  
**```    <PackageReference Include="DinkToPdf" Version="1.0.8" />```**  
**```    <Content Include="libwkhtmltox.dll" CopyToOutputDirectory="PreserveNewest" />```**  
**```    <Content Include="libwkhtmltox.so" CopyToOutputDirectory="PreserveNewest" />```**  
**```    <Content Include="libwkhtmltox.dylib" CopyToOutputDirectory="PreserveNewest" />```**  
```  </ItemGroup>```  
```  <ItemGroup>```  
```    <DotNetCliToolReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Tools" Version="2.0.2" />```  
```  </ItemGroup>```  
```</Project>```  
1. 仮想サーバーでの作業：```dotnet restore```を実行する
1. 仮想サーバーでの作業：Controllers/HomeControllerへの追記  

    ``` csharp
    using DinkToPdf;
    using System.Web;
    using DinkToPdf.Contracts;

    // ～省略～

    public IActionResult PDFDownload()
    {
        var doc = new HtmlToPdfDocument()
        {
            GlobalSettings = {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Landscape,
                PaperSize = PaperKind.A4Plus,
                },
                Objects = {
                new ObjectSettings() {
                    PagesCount = true,
                    HtmlContent = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur mauris eget ultrices  iaculis. Ut                               odio viverra, molestie lectus nec, venenatis turpis.",
                    WebSettings = { DefaultEncoding = "utf-8" },
                    HeaderSettings = { FontSize = 9, Right = "Page [page] of [toPage]", Line = true, Spacing = 2.812 }
                }
            }
        };

        var converter = new SynchronizedConverter(new PdfTools());
        byte[] pdf = converter.Convert(doc);

        // サンプルのファイル名
        string fileName = string.Format("テスト_{0:yyyyMMddHHmmss}.pdf", DateTime.Now);
        fileName = HttpUtility.UrlEncode(fileName, System.Text.Encoding.UTF8);

        // ファイル名を設定
        Response.Headers.Add("Content-Disposition", "attachment; filename=" + fileName);

        return new FileContentResult(pdf, "application/pdf");
    }   
    ```
1. 仮想サーバーでの作業：下記のメッセージが表示されることを確認する  
    ```
    Hosting environment: Production
    Content root path: /vagrant/coretest
    Now listening on: http://localhost:5000
    Application started. Press Ctrl+C to shut down.
    ```
1. Windowsでの作業：ブラウザを立ち上げ、 ```http://localhost:8080/Home/PDFDownload```にアクセスする  
   PDFがダウンロードされることを確認する
1. 「Ctrl+C」を押してプログラムの実行を終了する
1. 動作確認したら ```exit``` でログアウトする
1. コマンドプロンプトで仮想サーバーの停止を行う  
```vagrant halt```  

## おわりに
今回はASP.NET CoreでPDF出力できるようにしました。  

## 参考
- [DinkToPdfを使ってみた](https://github.com/kazenetu/dotNETCoreTest/blob/master/useDinkToPdf.md)