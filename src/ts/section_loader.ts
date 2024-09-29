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