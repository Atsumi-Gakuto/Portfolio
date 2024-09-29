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
 * タグのデータ構造
 */
interface TagData {
    /**
     * タグ名
     */
    name: string;
    /**
     * タグ色のカラーコード。nullの場合はデフォルトの色にする。
     */
    color?: string;
}

/**
 * 作品一覧を読み込むクラス
 */
class WorkLoader extends SectionLoader {
    /**
     * 記事のタグ一覧
     */
    private Tags: {[key: string]: TagData} = {};

    /**
     * セクション内のコンテンツを取得する真髄の関数
     * @returns コンテンツを取得に成功した場合は`true`、失敗した場合は`false`をPromiseで返す。
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
                        entry.tags.forEach((tag: string) => {
                            const tagEntry: HTMLDivElement = document.createElement("div");
                            tagEntry.classList.add("tag");
                            const tagIconImage: HTMLImageElement = document.createElement("img");
                            tagIconImage.src = "./images/icons/tag.svg";
                            tagEntry.appendChild(tagIconImage);
                            const tagColor: HTMLDivElement = document.createElement("div");
                            tagColor.classList.add("tag_color");
                            tagColor.style.backgroundColor = this.Tags[tag]?.color ?? "lightgray";
                            tagEntry.appendChild(tagColor);
                            const tagName: HTMLParagraphElement = document.createElement("p");
                            tagName.innerText = this.Tags[tag]?.name ?? "unknown";
                            tagEntry.appendChild(tagName);
                            articleTags.appendChild(tagEntry);
                        });
                        articleBottom.appendChild(articleTags);
                        const moreButton: HTMLButtonElement = document.createElement("button");
                        moreButton.innerText = "More";
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

    /**
     * タグの一覧を読み込む。
     */
    private getTags(): Promise<void> {
        const tagLoadFail: HTMLDivElement = document.getElementById("tags_load_fail") as HTMLDivElement;
        tagLoadFail.classList.add("hidden");
        return new Promise((resolve: () => void) => {
            fetch("./data/tags.json").then((response: Response) => {
                response.json().then((data: {[key: string]: TagData}) => {
                    for(let key in data) this.Tags[key] = data[key];
                    resolve();
                }).catch(() => {
                    tagLoadFail.classList.remove("hidden");
                });
            }).catch(() => {
                tagLoadFail.classList.remove("hidden");
            });
        });
    }

    /**
     * 初期化関数
     */
    public async init(): Promise<void> {
        (document.querySelector("#tags_load_fail > button") as HTMLDivElement).addEventListener("click", this.getTags);
        await this.getTags();
        super.init();
    }
}

new WorkLoader(document.getElementById("works_loading") as HTMLDivElement, document.getElementById("works_load_fail") as HTMLDivElement).init();