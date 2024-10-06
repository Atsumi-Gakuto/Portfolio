/**
 * メインクラス
 */
class Main {
    /**
     * ポップアップマネージャ
     */
    public readonly popupManager: PopupManager = new PopupManager();

    /**
     * 初期化関数
     */
    public init() {
        new AboutManager().init();
        new SkillLoader(document.getElementById("skills_loading") as HTMLDivElement, document.getElementById("skills_load_fail") as HTMLDivElement).init();
        new WorkLoader(this, document.getElementById("works_loading") as HTMLDivElement, document.getElementById("works_load_fail") as HTMLDivElement).init();
        this.popupManager.init();
    }
}

new Main().init();