class GameMain extends Rf.ETS.FrameWork.GameMain {
    //TODO プロパティやフィールドを記述してください。
    private hellow:Rf.ETS.FrameWork.Label = null;
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
        //TODO this.resourceManager.SetResourcePathメソッドでリソースのルートパスを設定してください。
        //例）
        //this.resourceManager.SetResourcePath("./assets/resources/");

        //TODO リソースのキーとファイルパスを記述してください。
        //例）
        //this.resourceManager.AddResourceName("charaImage", "chara.png");
    }

    /**
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    protected onLoad(parent: enchant.Group): void {
        //ラベルを生成
        this.hellow = new Rf.ETS.FrameWork.Label(parent);
        this.hellow.text = "Hello world";
        this.hellow.width = 100;
        this.hellow.touchEnabled = false;
        this.hellow.textAlign = "center";
        this.hellow.x = 100;
        this.hellow.y = 100;
        this.hellow.touchEnabled = true;

        //ラベルのタップで落下するイベント
        this.hellow.on(enchant.Event.TOUCH_END,(e:enchant.Event)=>{
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
        //タップされた場合はラベルを移動させる
        if(this.isFall){
          this.hellow.y += this.fallSpeed;
          if(this.fallSpeed < 10){
            this.fallSpeed += 1;
          }
          if(this.hellow.y > 480){
            this.hellow.y = 100;
            this.isFall = false;
          }
        }
    }
}
//メインクラスのインスタンス作成
createMain(GameMain);
