/**
 * ポップアップ記事のデータ構造
 */
interface PopupArticleData {
    /**
     * サムネイル画像までのパス
     */
    thumbnail: string;
    /**
     * 記事のタイトル
     */
    title: string;
    /**
     * 記事の本文のhtmlまでのパス
     */
    body: string;
    /**
     * 記事に付けられているタグの名前の配列
     */
    tagNames: string[];
}

/**
 * ポップアップを管理するクラス
 */
class PopupManager {
    /**
     * 親のメインクラス
     */
    private readonly parent: Main;

    /**
     * コンストラクタ
     * @param parent 親のメインクラスへの参照子
     */
    constructor(parent: Main) {
        this.parent = parent;
    }

    /**
     * 記事のポップアップを表示される。
     * @param articleData 表示する記事のデータ
     */
    public showArticle(articleData: PopupArticleData): void {
        (document.getElementById("article_image") as HTMLImageElement).src = articleData.thumbnail;
        (document.getElementById("article_title") as HTMLHeadingElement).innerText = articleData.title;
        (document.getElementById("article_body_html") as HTMLIFrameElement).src = articleData.body;
        const tagArea: HTMLDivElement = document.getElementById("article_tags") as HTMLDivElement;
        while(tagArea.children.length > 0) tagArea.children.item(0)!.remove();
        articleData.tagNames.forEach((tagName: string) => this.parent.tagManager.insertTagElement(tagArea, tagName, false));
        (document.getElementById("popup_area") as HTMLDivElement).classList.remove("hidden");
        setTimeout(() => {
            (document.getElementById("popup_background") as HTMLDivElement).classList.add("popup_transition");
            (document.getElementById("popup_content") as HTMLDivElement).classList.add("popup_transition");
        }, 1);
    }

    /**
     * 記事のポップアップを閉じる。
     */
    public closeArticle(): void {
        const popupBackground:  HTMLDivElement = document.getElementById("popup_background") as HTMLDivElement;
        popupBackground.classList.remove("popup_transition");
        (document.getElementById("popup_content") as HTMLDivElement).classList.remove("popup_transition");
        popupBackground.addEventListener("transitionend", () => (document.getElementById("popup_area") as HTMLDivElement).classList.add("hidden"), {
            once: true
        });
    }

    /**
     * 初期化関数
     */
    public init(): void {
        (document.getElementById("popup_close_button") as HTMLInputElement).addEventListener("click", () => this.closeArticle());
        (document.getElementById("article_close_button") as HTMLButtonElement).addEventListener("click", () => this.closeArticle());
    }
}