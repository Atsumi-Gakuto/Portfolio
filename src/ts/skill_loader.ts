/**
 * スキルのデータ構造
 */
interface SkillData {
    /**
     * スキル名
     */
    name: string;
    /**
     * スキルアイコンのファイル名
     * nullの場合はデフォルトのアイコンを充てる。
     */
    icon?: string;
}

/**
 * スキル一覧を読み込むクラス
 */
class SkillLoader extends SectionLoader {
    /**
     * コンテンツ読み込み直前に実行される関数
     */
    protected onBeforeLoad(): void {
        super.onBeforeLoad();
        (document.getElementById("skills") as HTMLDivElement).classList.add("hidden");
    }

    /**
     * コンテンツの読込に成功した時に実行される関数
     */
    protected onLoadSucceeded(): void {
        super.onLoadSucceeded();
        (document.getElementById("skills") as HTMLDivElement).classList.remove("hidden");
    }

    /**
     * セクション内のコンテンツを取得する真髄の関数
     * @returns コンテンツを取得に成功した場合は`true`、失敗した場合は`false`をPromiseで返す。
     */
    protected getContentsCore(): Promise<boolean> {
        return new Promise((resolve: (result: boolean) => void) => {
            fetch("./data/skills.json").then((response: Response) => {
                response.json().then((data: SkillData[]) => {
                    data.forEach((entry: SkillData) => {
                        const skillEntry: HTMLDivElement = document.createElement("div");
                        skillEntry.classList.add("gray_floating_block");
                        const skillIcon: HTMLImageElement = document.createElement("img");
                        skillIcon.src = entry.icon != null ? `./images/skill_icons/${entry.icon}` : "./images/skill_icons/unknown.svg";
                        const skillName: HTMLParagraphElement = document.createElement("p");
                        skillName.innerText = entry.name;
                        skillEntry.appendChild(skillIcon);
                        skillEntry.appendChild(skillName);
                        (document.getElementById("skills") as HTMLDivElement).appendChild(skillEntry);
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