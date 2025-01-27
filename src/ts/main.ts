/**
 * メインクラス
 */
class Main {
    /**
     * タグマネージャ
     */
    public readonly tagManager: TagLoader = new TagLoader(this, document.getElementById("tags_load_fail") as HTMLDivElement);

    /**
     * タグフィルターマネージャ
     */
    public readonly tagFilterManager: TagFilterManager = new TagFilterManager(this);

    /**
     * ポップアップマネージャ
     */
    public readonly popupManager: PopupManager = new PopupManager(this);

    /**
     * 初期化関数
     */
    public async init(): Promise<void> {
        new HeaderManager().init();
        new AboutManager().init();
        new SkillLoader(document.getElementById("skills_loading") as HTMLDivElement, document.getElementById("skills_load_fail") as HTMLDivElement).init();
        await this.tagManager.init();
        this.tagFilterManager.init();
        new WorkLoader(this, document.getElementById("works_loading") as HTMLDivElement, document.getElementById("works_load_fail") as HTMLDivElement).init();
        this.popupManager.init();
    }
}

new Main().init();