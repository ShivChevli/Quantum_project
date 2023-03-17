export class TabMenu {
    constructor(element) {
        this.tab_container = element;
        this.tab_items = [];
        let t1 = this.tab_container.querySelectorAll("[role='tab']");
        this.tab_list_length = t1.length;
        this.active_tab_index = 0;
        console.log(t1);
        t1.forEach((el) => {
            this.tab_items.push(el);
            el.tabIndex = -1;
            el.addEventListener("keydown", this.onTabItemKeydown.bind(this));
        });
        this.tab_items[0].tabIndex = 0;
    }
    onTabItemKeydown(event) {
        let key = event.key;
        let flag = false;
        switch (key) {
            case "Enter":
            case " ":
                this.activeTab();
                flag = true;
                break;
            case "right":
            case "ArrowRight":
                this.changeToNextTab();
                flag = true;
                break;
            case "left":
            case "ArrowLeft":
                this.changeToPreviousTab();
                flag = true;
                break;
            case "Home":
                this.changeToFirstTab();
                flag = true;
                break;
            case "End":
                this.changeToLastTab();
                flag = true;
                break;
            default:
                break;
        }
        if (flag) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    changeToNextTab() {
        this.active_tab_index++;
        if (this.active_tab_index >= this.tab_list_length) {
            this.active_tab_index = 0;
        }
        this.changeTab();
    }
    changeToPreviousTab() {
        this.active_tab_index--;
        if (this.active_tab_index < 0) {
            this.active_tab_index = this.tab_list_length - 1;
        }
        this.changeTab();
    }
    changeToFirstTab() {
        this.active_tab_index = 0;
        this.changeTab();
    }
    changeToLastTab() {
        this.active_tab_index = this.tab_list_length - 1;
        this.changeTab();
    }
    changeTab(new_active_tab = undefined) {
        if (new_active_tab === undefined) {
            new_active_tab = this.tab_items[this.active_tab_index];
        }
        this.tab_items.forEach((el) => {
            if (el === new_active_tab) {
                el.tabIndex = 0;
                new_active_tab.focus();
            }
            else {
                el.tabIndex = -1;
            }
        });
    }
    activeTab(new_active_tab = undefined) {
        if (new_active_tab === undefined) {
            new_active_tab = this.tab_items[this.active_tab_index];
        }
        let oldTab = this.tab_container.querySelector(".active[role='tab']");
        oldTab.classList.remove("active");
        oldTab.ariaSelected = "false";
        document.querySelector(`#${oldTab.getAttribute("aria-controls")}`).classList.remove("active");
        new_active_tab.classList.add("active");
        let tabPane = document.querySelector(`#${new_active_tab.getAttribute("aria-controls")}`);
        tabPane.classList.add("active");
        new_active_tab.ariaSelected = "true";
    }
}
//# sourceMappingURL=tabmenu.js.map