# .NET Core 環境変数の設定方法

## はじめに
.NET Coreではデータベースの接続情報などを  
「appsettings.Development.json」や「appsettings.json」に記述することができます。  
ただ、GitHubなど誰でも閲覧できる場所に本番系の情報を記述するのはおすすめできません。  
環境変数に本番系の情報を設定を行うようにします。  

今回はVisualStudio2017を例に説明します。

## 環境
- Windows10 Home  
- .Net Core SDK 2.1.4
- VisualStudio2017
- appsettings.Development.jsonは以下のとおり  
  ```
  {
    ～省略～
    "DB": {
      "ConnectionStrings": {
        "sqlite": "接続文字列1"
      }
    }
  }
  ```  
  ※sqliteの値を「上書き済み」に上書きする

## 手順
1. 「プロジェクトプロパティ」を開く
1. 「デバッグ」を選択
1. 「環境変数」の行を追加
1. 下記のキーと値を設定
    | キー※                      |値         |
    |:---------------------------|:----------|
    |DB:ConnectionStrings:sqlite | 上書き済み |
    **※入れ子は「:」で区切る**

## おわりに
環境変数でデータベースの接続文字列を上書きする方法を説明しました。  
「入れ子構造になっているときは「:」で区切る」がポイントです。  
Azure WebAppsなどでも環境変数の設定が行えるので、キーの設定方法はそのまま利用できると思います。