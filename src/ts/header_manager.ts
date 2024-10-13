/**
 * ヘッダーのマネージャークラス
 */
class HeaderManager {
    /**
     * 初期化関数
     */
    public init(): void {
        (document.getElementById("compact_nav") as HTMLInputElement).addEventListener("click", () => {
            const compactNavMenu: HTMLDivElement = document.getElementById("compact_nav_menu") as HTMLDivElement;
            if(compactNavMenu.classList.contains("hidden")) {
                setTimeout(() => {
                    const compactNavMenu: HTMLDivElement = document.getElementById("compact_nav_menu") as HTMLDivElement;
                    compactNavMenu.classList.remove("hidden");
                    setTimeout(() => compactNavMenu.classList.add("compact_menu_transition"), 1);
                }, 1);
            }
        });
        document.addEventListener("click", () => {
            const compactNavMenu: HTMLDivElement = document.getElementById("compact_nav_menu") as HTMLDivElement;
            if(!compactNavMenu.classList.contains("hidden")) {
                compactNavMenu.classList.remove("compact_menu_transition");
                compactNavMenu.addEventListener("transitionend", () => compactNavMenu.classList.add("hidden"), {once: true});
            }
        });
    }
}