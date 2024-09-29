/**
 * スキルのデータ構造
 */
interface SkillData {
    /**
     * スキル名
     */
    name: string;
    /**
     * スキルを示すアイコンまでのパス。
     * nullの場合はデフォルトのアイコンを充てる。
     */
    icon?: string;
}

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
     * セクション内のコンテンツを取得する。
     */
    protected getContents(): void {
        this.onBeforeLoad();
        const skillArea: HTMLDivElement = document.getElementById("skills") as HTMLDivElement;
        while(skillArea.children.length > 0) skillArea.children.item(0)!.remove();
        fetch("./data/skills.json").then((response: Response) => {
            response.json().then((data: SkillData[]) => {
                data.forEach((entry: SkillData) => {
                    const skillEntry: HTMLDivElement = document.createElement("div");
                    skillEntry.classList.add("gray_floating_block");
                    const skillIcon: HTMLImageElement = document.createElement("img");
                    skillIcon.src = typeof(entry.icon) == "string" ? `./images/skill_icons/${entry.icon}` : "./images/skill_icons/default.svg";
                    const skillName: HTMLParagraphElement = document.createElement("p");
                    skillName.innerText = entry.name;
                    skillEntry.appendChild(skillIcon);
                    skillEntry.appendChild(skillName);
                    skillArea.appendChild(skillEntry);
                });
                this.onLoadSucceeded();
            }).catch(() => {
                this.onLoadFailed();
            });
        }).catch(() => {
            this.onLoadFailed();
        });
    }
}

new SkillLoader(document.getElementById("skills_loading") as HTMLDivElement, document.getElementById("skills_load_fail") as HTMLDivElement).init();