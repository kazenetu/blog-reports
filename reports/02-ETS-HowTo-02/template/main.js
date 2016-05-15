var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        _super.apply(this, arguments);
        //TODO プロパティやフィールドを記述してください。
        this.hellow = null;
    }
    /**
     * 初期化イベント
     * @method
     * @name FrameWork.GameMain#onInitialize
     */
    GameMain.prototype.onInitialize = function () {
        //サイズを320x480に変更
        this.screenWidth = 320;
        this.screenHeight = 480;
        //fpsを設定
        this.fps = 20;
    };
    /**
      * リソース設定イベント
      * @method
      * @name FrameWork.GameMain#resourceLoad
      */
    GameMain.prototype.onResourceSetting = function () {
        //TODO this.resourceManager.SetResourcePathメソッドでリソースのルートパスを設定してください。
        //例）
        //this.resourceManager.SetResourcePath("./assets/resources/");
        //TODO リソースのキーとファイルパスを記述してください。
        //例）
        //this.resourceManager.AddResourceName("charaImage", "chara.png");
    };
    /**
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    GameMain.prototype.onLoad = function (parent) {
        //ラベルを生成
        this.hellow = new Rf.ETS.FrameWork.Label(parent);
        this.hellow.text = "Hello world";
        this.hellow.width = 100;
        this.hellow.touchEnabled = false;
        this.hellow.textAlign = "center";
        this.hellow.x = 100;
        this.hellow.y = 0;
        //TODO イベントを記述してください。
    };
    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    GameMain.prototype.onRun = function () {
        //ラベルを移動させる
        this.hellow.y += 4;
        if (this.hellow.y > 480) {
            this.hellow.y -= 480;
        }
    };
    return GameMain;
}(Rf.ETS.FrameWork.GameMain));
//メインクラスのインスタンス作成
createMain(GameMain);
