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
}

/**
 * ポップアップを管理するクラス
 */
class PopupManager {
    /**
     * 記事のポップアップを表示される。
     * @param articleData 表示する記事のデータ
     */
    public showArticle(articleData: PopupArticleData): void {
        (document.getElementById("article_image") as HTMLImageElement).src = articleData.thumbnail;
        (document.getElementById("article_title") as HTMLHeadingElement).innerText = articleData.title;
        (document.getElementById("article_body_html") as HTMLIFrameElement).src = articleData.body;
        (document.getElementById("popup_area") as HTMLDivElement).classList.remove("hidden");
    }

    /**
     * 記事のポップアップを閉じる。
     */
    public closeArticle(): void {
        (document.getElementById("popup_area") as HTMLDivElement).classList.add("hidden");
    }

    /**
     * 初期化関数
     */
    public init(): void {
        (document.getElementById("popup_close_button") as HTMLInputElement).addEventListener("click", () => this.closeArticle());
        (document.getElementById("article_close_button") as HTMLButtonElement).addEventListener("click", () => this.closeArticle());
    }
}