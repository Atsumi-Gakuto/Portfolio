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
     * セクション内のコンテンツを取得する。
     */
    protected getContents(): void {
        const skillArea: HTMLDivElement = document.getElementById("skills") as HTMLDivElement;
        this.LoadingArea.classList.remove("hidden");
        this.LoadFailedArea.classList.add("hidden");
        skillArea.classList.add("hidden");
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
                this.LoadingArea.classList.add("hidden");
                skillArea.classList.remove("hidden");
            }).catch(() => {
                this.LoadingArea.classList.add("hidden");
                this.LoadFailedArea.classList.remove("hidden");
            });
        }).catch(() => {
            this.LoadingArea.classList.add("hidden");
            this.LoadFailedArea.classList.remove("hidden");
        });
    }
}

new SkillLoader(document.getElementById("skills_loading") as HTMLDivElement, document.getElementById("skills_load_fail") as HTMLDivElement).init();