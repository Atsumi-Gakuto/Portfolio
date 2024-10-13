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
 * タグを読み込むクラス
 */
class TagLoader extends SectionLoader {
    /**
     * 親のメインクラス
     */
    private readonly parent: Main;

    /**
     * タグ一覧を保持する変数
     */
    public Tags: {[key: string]: TagData} = {};

    /**
     * コンストラクタ
     * @param loadFailedArea 「読み込み失敗」を表示しているdiv要素
     */
    constructor(parent: Main, loadFailedArea: HTMLDivElement) {
        super(document.createElement("div"), loadFailedArea);
        this.parent = parent;
    }

    /**
     * タグを取得する真髄の関数
     * @returns コンテンツを取得に成功した場合は`true`、失敗した場合は`false`をPromiseで返す。
     */
    protected getContentsCore(): Promise<boolean> {
        return new Promise((resolve: (result: boolean) => void) => {
            fetch("./data/tags.json").then((response: Response) => {
                response.json().then((data: {[key: string]: TagData}) => {
                    for(let key in data) this.Tags[key] = data[key];
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
     * タグの一覧を取得し、記事のタグを新しく取得したタグ一覧で更新する。
     */
    private async getTags(): Promise<void> {
        this.LoadFailedArea.classList.add("hidden");
        if(!await this.getContentsCore()) this.LoadFailedArea.classList.remove("hidden");
        document.querySelectorAll(".refreshable_tag").forEach((element: Element) => {
            const tagName: string = element.getAttribute("data-tag-name")!;
            (element.children.item(1) as HTMLDivElement).style.backgroundColor = this.Tags[tagName]?.color ?? "lightgray";
            (element.children.item(2) as HTMLDivElement).innerText = this.Tags[tagName]?.name ?? "unknown";
        });
    }

    /**
     * ターゲットのdiv要素にタグ表示を挿入する。
     * @param targetParent タグ表示を挿入する目標のdiv要素
     * @param tagName 挿入するタグの内部名
     * @param shouldRefreshable this.getTags()実行時にタグ情報の更新対象にするかどうかを設定する。
     */
    public insertTagElement(targetParent: HTMLDivElement, tagName: string, shouldRefreshable: boolean) {
        const tagEntry: HTMLDivElement = document.createElement("div");
        tagEntry.classList.add("tag");
        if(shouldRefreshable) {
            tagEntry.classList.add("refreshable_tag");
            tagEntry.setAttribute("data-tag-name", tagName);
        }
        const tagIconImage: HTMLImageElement = document.createElement("img");
        tagIconImage.src = "./images/icons/tag.svg";
        tagEntry.appendChild(tagIconImage);
        const tagColor: HTMLDivElement = document.createElement("div");
        tagColor.classList.add("tag_color");
        tagColor.style.backgroundColor = this.Tags[tagName]?.color ?? "lightgray";
        tagEntry.appendChild(tagColor);
        const tagNameElement: HTMLParagraphElement = document.createElement("p");
        tagNameElement.innerText = this.Tags[tagName]?.name ?? "unknown";
        tagEntry.appendChild(tagNameElement);
        targetParent.appendChild(tagEntry);
    }

    /**
     * 初期化関数
     */
    public async init(): Promise<void> {
        (document.querySelector("#tags_load_fail > button") as HTMLDivElement).addEventListener("click", () => this.getTags());
        await this.getTags();
        super.init();
        this.parent.tagFilterManager.insertTagElements();
    }
}