/**
 * 作品のデータ構造
 */
interface WorkData {
    /**
     * サムネイル画像のファイル名
     */
    thumbnail: string;
    /**
     * 記事のタイトル
     */
    title: string;
    /**
     * 記事の概要
     */
    description: string;
    /**
     * 記事に付けるタグ
     */
    tags: string[];
    /**
     * 記事のhtmlファイル名
     */
    article: string;
}

/**
 * 作品一覧を読み込むクラス
 */
class WorkLoader extends SectionLoader {
    /**
     * 親のメインクラス
     */
    private readonly parent: Main;

    /**
     * コンストラクタ
     * @param parent 親のメインクラスへの参照子
     * @param loadingArea 「読み込み中」を表示しているdiv要素
     * @param loadFailedArea 「読み込み失敗」を表示しているdiv要素
     */
    constructor(parent: Main, loadingArea: HTMLDivElement, loadFailedArea: HTMLDivElement) {
        super(loadingArea, loadFailedArea);
        this.parent = parent;
    }

    /**
     * 作品一覧を取得する真髄の関数
     * @returns 作品一覧の取得に成功した場合は`true`、失敗した場合は`false`をPromiseで返す。
     */
    protected getContentsCore(): Promise<boolean> {
        return new Promise((resolve: (result: boolean) => void) => {
            fetch("./data/works.json").then((response: Response) => {
                response.json().then((data: WorkData[]) => {
                    data.forEach((entry: WorkData) => {
                        const workEntry: HTMLDivElement = document.createElement("div");
                        workEntry.classList.add("works_article", "gray_floating_block");
                        const articleImage: HTMLImageElement = document.createElement("img");
                        articleImage.src = `./images/article_thumbnails/${entry.thumbnail}`;
                        workEntry.appendChild(articleImage);
                        const articleSummary = document.createElement("div");
                        articleSummary.classList.add("article_summary");
                        const articleTitle: HTMLHeadingElement = document.createElement("h2");
                        articleTitle.innerText = entry.title;
                        articleSummary.appendChild(articleTitle);
                        const articleDescription: HTMLParagraphElement = document.createElement("p");
                        articleDescription.innerText = entry.description;
                        articleSummary.appendChild(articleDescription);
                        const articleBottom: HTMLDivElement = document.createElement("div");
                        const articleTags: HTMLDivElement = document.createElement("div");
                        articleTags.classList.add("tags");
                        entry.tags.forEach((tagName: string) => articleTags.appendChild(this.parent.tagManager.getTagElement(tagName, true)));
                        articleBottom.appendChild(articleTags);
                        const moreButton: HTMLButtonElement = document.createElement("button");
                        moreButton.innerText = "More";
                        moreButton.addEventListener("click", () => {
                            const tagsNames: string[] = [];
                            Array.prototype.forEach.call(articleTags.children, (child: HTMLDivElement) => tagsNames.push(child.getAttribute("data-tag-name")!));
                            this.parent.popupManager.showArticle({
                                thumbnail: `./images/article_thumbnails/${entry.thumbnail}`,
                                title: entry.title,
                                body: `./article_html/${entry.article}`,
                                tagNames: tagsNames
                            });
                        });
                        moreButton.classList.add("article_more_button", "button_black");
                        articleBottom.appendChild(moreButton);
                        articleSummary.appendChild(articleBottom);
                        workEntry.appendChild(articleSummary);
                        (document.getElementById("works") as HTMLDivElement).appendChild(workEntry);
                    });
                    resolve(true);
                }).catch(() => {
                    resolve(false);
                });
            }).catch(() => {
                resolve(false);
            });
        });
    }
}