/**
 * ABOUTセクションの内容を管理するクラス
 */
class AboutManager {
    /**
     * 初期化関数
     */
    public init() {
        const today: Date = new Date();
        today.setHours(today.getHours() + 9); //どの地域からも日本時間基準で処理したいため、UTCに+9時間して、これを日本時間とする。
        (document.getElementById("age") as HTMLSpanElement).innerText = (today.getUTCFullYear() - 2001 - ((today.getUTCMonth() + 1 == 11 && today.getUTCDate() >= 12) || today.getUTCMonth() + 1 >= 12 ? 0 : 1)).toString();
        (document.getElementById("school_years") as HTMLSpanElement).innerText = (today.getUTCFullYear() - 2024 + (today.getUTCMonth() + 1 >= 4 ? 1 : 0)).toString();
    }
}

new AboutManager().init();