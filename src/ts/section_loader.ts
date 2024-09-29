/**
 * セクション内のコンテンツを取得する抽象クラス
 */
abstract class SectionLoader {
    /**
     * 「読み込み中」を表示しているdiv要素
     */
    protected readonly LoadingArea: HTMLDivElement;

    /**
     * 「読み込み失敗」を表示しているdiv要素
     */
    protected readonly LoadFailedArea: HTMLDivElement;

    /**
     * コンストラクタ
     * @param loadingArea 「読み込み中」を表示しているdiv要素
     * @param loadFailedArea 「読み込み失敗」を表示しているdiv要素
     */
    constructor(loadingArea: HTMLDivElement, loadFailedArea: HTMLDivElement) {
        this.LoadingArea = loadingArea;
        this.LoadFailedArea = loadFailedArea;
    }

    /**
     * コンテンツ読み込み直前に実行される関数
     */
    protected onBeforeLoad(): void {
        this.LoadingArea.classList.remove("hidden");
        this.LoadFailedArea.classList.add("hidden");
    }

    /**
     * コンテンツの読込に成功した時に実行される関数
     */
    protected onLoadSucceeded(): void {
        this.LoadingArea.classList.add("hidden");
    }

    /**
     * コンテンツの読込に失敗した時に実行される関数
     */
    protected onLoadFailed(): void {
        this.LoadingArea.classList.add("hidden");
        this.LoadFailedArea.classList.remove("hidden");
    }

    /**
     * セクション内のコンテンツを取得する。
     */
    protected abstract getContents(): void;

    /**
     * 初期化関数
     */
    public init(): void {
        (document.querySelector(`#${this.LoadFailedArea.id} > button`) as HTMLButtonElement).addEventListener("click", () => this.getContents());
        this.getContents();
    }
}