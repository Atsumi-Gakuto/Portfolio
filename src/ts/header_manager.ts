/**
 * ヘッダーのマネージャークラス
 */
class HeaderManager {
    /**
     * 初期化関数
     */
    public init(): void {
        (document.getElementById("compact_nav") as HTMLInputElement).addEventListener("click", () => {
            setTimeout(() => (document.getElementById("compact_nav_menu") as HTMLDivElement).classList.remove("hidden"), 1);
        });
        document.addEventListener("click", () => {
            const compactNavMenu: HTMLDivElement = document.getElementById("compact_nav_menu") as HTMLDivElement;
            if(!compactNavMenu.classList.contains("hidden")) compactNavMenu.classList.add("hidden");
        });
    }
}