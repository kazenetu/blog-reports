# VisualStudio2017のIIS Expressで「ASP.NET Core」を別PCからアクセス可能にする

## はじめに
VisualStudioで「ASP.NET Core」の開発を行う際、  
「イントラネット上の別PCからアクセスする」必要のあるケースがあります。  
今回は初回設定と起動ごとの設定を紹介します。

## 環境
- Windows10 Home  
- VisualStudio 2017
- .NET Core 2.0 (2.1.201)

## 手順
- 初回設定
1. .vs/config/applicationhost.configの編集
    1. .vs/config/applicationhost.configをテキストエディタで開く
    1. sites要素を探す
    1. WebAPI要素を探す  
        例）
        ```
        ～省略～
        <sites>
          <site name="WebAPI" id="2">
            <application path="/" applicationPool="WebAPI AppPool">
              <virtualDirectory path="/" physicalPath="実際のファイルパス\Example\WebAPI" />
            </application>
            <bindings>
                <binding protocol="http" bindingInformation="*:5000:localhost" />
            </bindings>
          </site>
        </sites>
        ～省略～
        ```
    1. <binding protocol="http" bindingInformation="*:5000:localhost" />を探す
    1. コピペしてbindingInformation属性のlocalhostをPCのIPアドレスに変更する  
        例）
        ```
            <bindings>
                <binding protocol="http" bindingInformation="*:5000:localhost" />
            </bindings>
        ```
         ↓
        ```
            <bindings>
                <binding protocol="http" bindingInformation="*:5000:localhost" />
                <binding protocol="http" bindingInformation="*:5000:IPアドレス" />
            </bindings>
        ```
    1. applicationhost.configを保存し閉じる
1. ファイアウォールのポート(今回は5000ポート)を空ける
    - Windows10の場合
      1. 「設定」(ギアのアイコン)を開く
      1. 「ネットワークとインターネット」を開く
      1. 「状態タグ」(初期表示)を選択、「Windowsファイアウォール」を開く
      1. 「詳細設定」リンクをクリック
      1. 「セキュリティが強化されたWindows Defenderファイアウォール」ウィンドウが開く
          1. 「送信の規制」を選択、「新しい規制」をクリック
          1. 「ポート」を選択、「次へ」をクリック
          1. 「特定のポート」に5000を設定(ASP.NET Coreのデフォルト値)、「次へ」をクリック
          1. 「接続を許可する」を選択、「次へ」をクリック
          1. 「ドメイン」「プライベート」にチェックを入れ、「次へ」をクリック
          1. 「名前」などを入力し、「完了」をクリック  
          ※ 「受信の規制」も同じように設定すること

- 起動ごとの設定
1. VisualStudio2017を**管理者モード**で実行する
1. ASP.NET Coreのソリューションを開く
1. 実行環境を「**IIS Express**」に設定する
1. デバッグ実行する
1. 別PCでブラウザを立ち上げ「デバッグ実行しているPC」のIPアドレスとポートを指定しアクセスできることを確認する

## おわりに
ASP.NET CoreのWebアプリケーションをイントラネット上の別PCからアクセスできるまでの手順を説明しました。  
手間ですが、それほど面倒なこともないと思います。

## 参考資料
* Qiita:[Visual Studio 2015のIIS Expressにlocalhost以外からアクセスできるようにする方法](https://qiita.com/k_saito/items/790884389e0c0611b258)