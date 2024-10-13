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
     * 移行アニメーションの再生中かどうか
     */
    private isTransitioning: boolean = false;

    /**
     * 記事のHTMLファイルの高さを監視し、iframeの高さを調整するオブサーバ。
     */
    private observer?: ResizeObserver;

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
        if(!this.isTransitioning) {
            const articleBodyHtml: HTMLIFrameElement = document.getElementById("article_body_html") as HTMLIFrameElement;
            const loadingArea: HTMLDivElement = document.getElementById("article_loading") as HTMLDivElement;
            const fileNameMatcher: RegExp = /[^\/]+\.\w+$/;
            if(articleBodyHtml.src.length == 0 || articleBodyHtml.src.match(fileNameMatcher)![0] != articleData.body.match(fileNameMatcher)![0]) {
                articleBodyHtml.classList.add("hidden");
                loadingArea.classList.remove("hidden");
                (document.getElementById("article_image") as HTMLImageElement).src = articleData.thumbnail;
                (document.getElementById("article_title") as HTMLHeadingElement).innerText = articleData.title;
                articleBodyHtml.src = articleData.body;
            }
            this.observer = new ResizeObserver(() => articleBodyHtml.style.height = `${articleBodyHtml.contentWindow!.document.body.scrollHeight + window.innerWidth - document.body.clientWidth + 25}px`);
            articleBodyHtml.addEventListener("load", () => {
                this.observer!.observe(articleBodyHtml);
                articleBodyHtml.classList.remove("hidden");
                loadingArea.classList.add("hidden");
            }, { once: true });
            const tagArea: HTMLDivElement = document.getElementById("article_tags") as HTMLDivElement;
            while(tagArea.children.length > 0) tagArea.children.item(0)!.remove();
            articleData.tagNames.forEach((tagName: string) => tagArea.appendChild(this.parent.tagManager.getTagElement(tagName, false)));
            (document.getElementById("popup_area") as HTMLDivElement).classList.remove("hidden");
            setTimeout(() => {
                const popupBackground:  HTMLDivElement = document.getElementById("popup_background") as HTMLDivElement;
                popupBackground.classList.add("popup_transition");
                popupBackground.addEventListener("transitionend", () => this.isTransitioning = false, { once: true });
                (document.getElementById("article_area") as HTMLDivElement).classList.add("popup_transition");
                this.isTransitioning = true;
            }, 1);
        }
    }

    /**
     * 記事のポップアップを閉じる。
     */
    public closeArticle(): void {
        if(!this.isTransitioning) {
            const popupBackground:  HTMLDivElement = document.getElementById("popup_background") as HTMLDivElement;
            popupBackground.classList.remove("popup_transition");
            (document.getElementById("article_area") as HTMLDivElement).classList.remove("popup_transition");
            popupBackground.addEventListener("transitionend", () => {
                (document.getElementById("popup_area") as HTMLDivElement).classList.add("hidden");
                this.observer?.disconnect();
                this.isTransitioning = false;
            }, { once: true });
            this.isTransitioning = true;
        }
    }

    /**
     * 初期化関数
     */
    public init(): void {
        (document.getElementById("popup_background") as HTMLDivElement).addEventListener("click", () => this.closeArticle());
        (document.getElementById("article_close_button") as HTMLButtonElement).addEventListener("click", () => this.closeArticle());
    }
}