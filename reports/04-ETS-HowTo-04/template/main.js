var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        _super.apply(this, arguments);
        //フィールド
        this.sprite = null;
        this.isFall = false;
        this.fallSpeed = 0;
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
        //this.resourceManager.SetResourcePathメソッドでリソースのルートパスを設定
        this.resourceManager.SetResourcePath("./assets/resources/");
        //リソースのキーとファイルパスを記述
        this.resourceManager.AddResourceName("charaImage", "chara.png");
    };
    /**
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    GameMain.prototype.onLoad = function (parent) {
        var _this = this;
        //グラフィックを生成
        this.sprite = new Rf.ETS.FrameWork.Sprite(32, 32, parent);
        //イメージの設定(Rf.ETS.FrameWork.Sprite独自の機能)
        this.sprite.FileName = this.resourceManager.GetResourceName("charaImage");
        //その他の情報の設定(enchant.js共通）
        this.sprite.originX = 16; //中心で回転するように設定
        this.sprite.originY = 16; //中心で回転するように設定
        this.sprite.frame = 26 * 2; //サンプル画像で正面画像を表示する
        this.sprite.touchEnabled = true;
        this.sprite.x = 100;
        this.sprite.y = 100;
        //グラフィックのタップで落下するイベント
        this.sprite.on(enchant.Event.TOUCH_END, function (e) {
            if (_this.isFall === false) {
                _this.isFall = true;
                _this.fallSpeed = 2;
            }
        });
    };
    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    GameMain.prototype.onRun = function () {
        //タップされた場合はグラフィックを落下させる
        if (this.isFall) {
            this.sprite.y += this.fallSpeed;
            if (this.fallSpeed < 10) {
                this.fallSpeed += 1;
            }
            if (this.sprite.y > 480) {
                this.sprite.y = 100;
                this.isFall = false;
            }
        }
    };
    return GameMain;
}(Rf.ETS.FrameWork.GameMain));
//メインクラスのインスタンス作成
createMain(GameMain);
