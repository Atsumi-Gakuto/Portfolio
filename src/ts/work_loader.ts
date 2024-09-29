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
                        /*
                        entry.tags.forEach((tag: TagData) => {
                            const tagEntry: HTMLDivElement = document.createElement("div");
                            tagEntry.classList.add("tag");
                            const tagIconImage: HTMLImageElement = document.createElement("img");
                            tagIconImage.src = "./images/icons/tag.svg";
                            tagEntry.appendChild(tagIconImage);
                            const tagColor: HTMLDivElement = document.createElement("div");
                            tagColor.classList.add("tag_color");
                            tagColor.style.backgroundColor = typeof(tag.color) == "string" ? tag.color : "#4b";
                            tagEntry.appendChild(tagColor);
                            const tagName: HTMLParagraphElement = document.createElement("p");
                            tagName.innerText = tag.name;
                            tagEntry.appendChild(tagName);
                            articleTags.appendChild(tagEntry)
                        });
                        */
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
}

new WorkLoader(document.getElementById("works_loading") as HTMLDivElement, document.getElementById("works_load_fail") as HTMLDivElement).init();