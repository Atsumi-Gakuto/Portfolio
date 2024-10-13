/**
 * タグフィルターのマネージャークラス
 */
class TagFilterManager {
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
     * タグフィルターに基づいて記事をフィルタリングする。
     */
    private filterTags(): void {
        const filteredTags: string[] = [];
        Array.prototype.forEach.call((document.getElementById("tag_filter_selected_tags") as HTMLDivElement).children, (child: HTMLDivElement) => filteredTags.push(child.getAttribute("data-tag-name")!));
        if(filteredTags.length > 0) {
            Array.prototype.forEach.call((document.getElementById("works") as HTMLDivElement).children, (article: HTMLDivElement) => {
                const articleTags: string[] = Array.prototype.map.call(article.lastElementChild!.lastElementChild!.firstElementChild!.children, (tagElement: HTMLDivElement) => tagElement.getAttribute("data-tag-name")) as string[];
                let shouldShowArticle: boolean = true;
                for(const tag of filteredTags) {
                    if(articleTags.indexOf(tag) == -1) {
                        shouldShowArticle = false;
                        break;
                    }
                }
                if(shouldShowArticle) article.classList.remove("hidden");
                else article.classList.add("hidden");
            });
            if(document.querySelectorAll("#works > div:not(.hidden)").length == 0) (document.getElementById("no_article_message") as HTMLParagraphElement).classList.remove("hidden");
            else (document.getElementById("no_article_message") as HTMLParagraphElement).classList.add("hidden");
        }
        else {
            Array.prototype.forEach.call((document.getElementById("works") as HTMLDivElement).children, (article: HTMLDivElement) => article.classList.remove("hidden"));
            (document.getElementById("no_article_message") as HTMLParagraphElement).classList.add("hidden");
        }
    }

    /**
     * タグの選択肢として、全てのタグのHTML要素を挿入する。
     */
    public insertTagElements(): void {
        const tagArea: HTMLDivElement = document.getElementById("tag_filter_list_area") as HTMLDivElement;
        while(tagArea.children.length > 0) tagArea.children.item(0)!.remove();
        for(let key in this.parent.tagManager.Tags) {
            const tagElement: HTMLDivElement = this.parent.tagManager.getTagElement(key, true);
            tagElement.classList.add("clickable_tag");
            tagElement.addEventListener("click", (event: MouseEvent) => {
                if((event.target as HTMLDivElement).classList.contains("selected_tag")) {
                    const tagName: string = (event.target as HTMLDivElement).getAttribute("data-tag-name")!;
                    (document.querySelector(`#tag_filter_selected_tags > div[data-tag-name=${tagName}]`) as HTMLDivElement).remove();
                    (document.getElementById("tag_filter_clear_button") as HTMLInputElement).disabled = (document.getElementById("tag_filter_selected_tags") as HTMLDivElement).children.length == 0;
                    document.querySelectorAll(`div[data-tag-name=${tagName}]`).forEach((element: Element) => element.classList.remove("selected_tag"));
                }
                else {
                    const tagElement2: HTMLDivElement = (event.target as HTMLDivElement).cloneNode(true) as HTMLDivElement;
                    tagElement2.addEventListener("click", () => {
                        const tagName: string = tagElement2.getAttribute("data-tag-name")!;
                        (document.querySelector(`#tag_filter_list_area > div[data-tag-name=${tagName}]`) as HTMLDivElement).classList.remove("selected_tag");
                        tagElement2.remove();
                        (document.getElementById("tag_filter_clear_button") as HTMLInputElement).disabled = (document.getElementById("tag_filter_selected_tags") as HTMLDivElement).children.length == 0;
                        document.querySelectorAll(`div[data-tag-name=${tagName}]`).forEach((element: Element) => element.classList.remove("selected_tag"));
                        this.filterTags();
                    });
                    (document.getElementById("tag_filter_selected_tags") as HTMLDivElement).appendChild(tagElement2);
                    (document.getElementById("tag_filter_clear_button") as HTMLInputElement).disabled = false;
                    document.querySelectorAll(`div[data-tag-name=${(event.target as HTMLDivElement).getAttribute("data-tag-name")}]`).forEach((element: Element) => element.classList.add("selected_tag"));
                    tagElement2.classList.remove("selected_tag");
                }
                this.filterTags();
            });
            tagArea.appendChild(tagElement);
        }
    }

    /**
     * 初期化関数
     */
    public init(): void {
        (document.getElementById("tag_filter_clear_button") as HTMLInputElement).addEventListener("click", () => {
            const selectedTagArea = document.getElementById("tag_filter_selected_tags") as HTMLDivElement;
            while(selectedTagArea.children.length > 0) selectedTagArea.children.item(0)!.remove();
            (document.getElementById("tag_filter_clear_button") as HTMLInputElement).disabled = true;
            document.querySelectorAll(".selected_tag").forEach((element: Element) => element.classList.remove("selected_tag"));
            this.filterTags();
        });
    }
}