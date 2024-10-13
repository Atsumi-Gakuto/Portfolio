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
                    (document.querySelector(`#tag_filter_selected_tags > div[data-tag-name=${(event.target as HTMLDivElement).getAttribute("data-tag-name")}]`) as HTMLDivElement).remove();
                    (document.getElementById("tag_filter_clear_button") as HTMLInputElement).disabled = (document.getElementById("tag_filter_selected_tags") as HTMLDivElement).children.length == 0;
                }
                else {
                    const tagElement2: HTMLDivElement = (event.target as HTMLDivElement).cloneNode(true) as HTMLDivElement;
                    tagElement2.addEventListener("click", () => {
                        (document.querySelector(`#tag_filter_list_area > div[data-tag-name=${tagElement2.getAttribute("data-tag-name")}]`) as HTMLDivElement).classList.remove("selected_tag");
                        tagElement2.remove();
                        (document.getElementById("tag_filter_clear_button") as HTMLInputElement).disabled = (document.getElementById("tag_filter_selected_tags") as HTMLDivElement).children.length == 0;
                    });
                    (document.getElementById("tag_filter_selected_tags") as HTMLDivElement).appendChild(tagElement2);
                    (document.getElementById("tag_filter_clear_button") as HTMLInputElement).disabled = false;
                }
                (event.target as HTMLDivElement).classList.toggle("selected_tag");
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
            document.querySelectorAll("#tag_filter_list_area > .selected_tag").forEach((element: Element) => element.classList.remove("selected_tag"));
        });
    }
}