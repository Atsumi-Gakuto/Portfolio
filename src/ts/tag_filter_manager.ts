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
    public insertTagElements() {
        const tagArea: HTMLDivElement = document.getElementById("tag_filter_list_area") as HTMLDivElement;
        while(tagArea.children.length > 0) tagArea.children.item(0)!.remove();
        for(let key in this.parent.tagManager.Tags) this.parent.tagManager.insertTagElement(tagArea, key, true);
    }
}