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

/**
 * スキルセクションの内容を取得する。
 */
function getSkills(): void {
    const loadingIcon: HTMLDivElement = document.getElementById("skills_loading") as HTMLDivElement;
    const skillArea: HTMLDivElement = document.getElementById("skills") as HTMLDivElement;
    loadingIcon.classList.remove("hidden");
    skillArea.classList.add("hidden");
    while(skillArea.children.length > 0) skillArea.children.item(0)!.remove();
    fetch("./data/skills.json").then((response: Response) => {
        response.json().then((data: SkillData[]) => {
            data.forEach((entry: SkillData) => {
                const skillEntry: HTMLDivElement = document.createElement("div");
                const skillIcon: HTMLImageElement = document.createElement("img");
                skillIcon.src = typeof(entry.icon) == "string" ? `./images/skill_icons/${entry.icon}` : "./images/skill_icons/default.svg";
                const skillName: HTMLParagraphElement = document.createElement("p");
                skillName.innerText = entry.name;
                skillEntry.appendChild(skillIcon);
                skillEntry.appendChild(skillName);
                skillArea.appendChild(skillEntry);
            });
            loadingIcon.classList.add("hidden");
            skillArea.classList.remove("hidden");
        });
    });
}

/**
 * 初期化関数
 */
function init(): void {
    getSkills();
}

init();