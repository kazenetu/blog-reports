class GameMain extends Rf.ETS.FrameWork.GameMain {
    //フィールド
    private sprite: Rf.ETS.FrameWork.Sprite = null;
    private isFall:boolean = false;
    private fallSpeed:number = 0;

    /**
     * 初期化イベント
     * @method
     * @name FrameWork.GameMain#onInitialize
     */
    protected onInitialize(): void {
        //サイズを320x480に変更
        this.screenWidth = 320;
        this.screenHeight = 480;

        //fpsを設定
        this.fps = 20;
    }

    /**
      * リソース設定イベント
      * @method
      * @name FrameWork.GameMain#resourceLoad
      */
    protected onResourceSetting(): void {
        //this.resourceManager.SetResourcePathメソッドでリソースのルートパスを設定
        this.resourceManager.SetResourcePath("./assets/resources/");

        //リソースのキーとファイルパスを記述
        this.resourceManager.AddResourceName("charaImage", "chara.png");
    }

    /**
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    protected onLoad(parent: enchant.Group): void {
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
        this.sprite.on(enchant.Event.TOUCH_END,(e:enchant.Event)=>{
          if(this.isFall === false){
            this.isFall = true;
            this.fallSpeed = 2;
          }
        });
    }

    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    protected onRun(): void {
        //タップされた場合はグラフィックを落下させる
        if(this.isFall){
          this.sprite.y += this.fallSpeed;
          if(this.fallSpeed < 10){
            this.fallSpeed += 1;
          }
          if(this.sprite.y > 480){
            this.sprite.y = 100;
            this.isFall = false;
          }
        }
    }
}
//メインクラスのインスタンス作成
createMain(GameMain);
