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
        this.resourceManager.AddResourceName("charaImage", "3x4_chara.png");
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
        this.sprite = new Rf.ETS.FrameWork.Character(32, 32, parent);
        //イメージの設定(Rf.ETS.FrameWork.Sprite独自の機能)
        this.sprite.FileName = this.resourceManager.GetResourceName("charaImage");
        //その他の設定(Rf.ETS.FrameWork.Character独自の機能)
        this.sprite.charaIndex = 0;
        this.sprite.AnimePattern = [0, 1, 0, 2];
        this.sprite.AnimeWidth = 3;
        this.sprite.Dir = Rf.ETS.FrameWork.Direction.Down;
        this.sprite.touchEnabled = true;
        this.sprite.x = 100;
        this.sprite.y = 100;
        //グラフィックのタップで落下するイベント
        this.sprite.on(enchant.Event.TOUCH_END, function (e) {
            if (_this.isFall === false) {
                _this.isFall = true;
                _this.fallSpeed = 2;
                //アニメを停止させる(Rf.ETS.FrameWork.Character独自の機能)
                _this.sprite.SuspendAnime();
            }
        });
    };
    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    GameMain.prototype.onRun = function () {
        //歩行アニメする
        this.sprite.Run();
        //タップされた場合はグラフィックを落下させる
        if (this.isFall) {
            this.sprite.y += this.fallSpeed;
            if (this.fallSpeed < 10) {
                this.fallSpeed += 1;
            }
            if (this.sprite.y > 480) {
                this.sprite.y = 100;
                this.isFall = false;
                //アニメを再開させる(Rf.ETS.FrameWork.Character独自の機能)
                this.sprite.ResumeAnime();
            }
        }
    };
    return GameMain;
}(Rf.ETS.FrameWork.GameMain));
//メインクラスのインスタンス作成
createMain(GameMain);
