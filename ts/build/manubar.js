export class Menubar {
    constructor(element) {
        this.menu = element;
        this.active_index = -1;
        this.menu_stack = [];
        this.active_index_stack = [];
        this.active_menu = null;
        let tmp = this.menu.querySelectorAll("a");
        this.active_index = 0;
        let main_menu = this.getMenuLinks(this.menu);
        this.active_menu = main_menu["menu_links"];
        // tmp.forEach(el => {
        //     el.setAttribute("tabindex", "-1");
        //     el.addEventListener("keydown", this.onLinkKeydown.bind(this));
        //     el.addEventListener("click", this.onMenuLinkClick.bind(this));
        // })
        // tmp[0].setAttribute("tabindex", "0");
        this.active_menu.forEach(el => {
            el.setAttribute("tabindex", "-1");
            el.addEventListener("keydown", this.onMainMenuLinkKeydown.bind(this));
            el.addEventListener("click", this.onMenuLinkClick.bind(this));
        });
        this.active_menu[0].setAttribute("tabindex", "0");
    }
    onMenuLinkClick(event) {
        let tgt = event.target;
        this.closeSubMenu();
        this.active_index = this.LinkToIndex(tgt);
        this.openSubMenu(tgt);
    }
    onMainMenuLinkKeydown(event) {
        var tgt = event.currentTarget, key = event.key, flag = false;
        if (event.shiftKey) {
            switch (key) {
                case "Tab":
                    // flag = true;    
                    break;
                default:
                    let tmp = key.toString();
                    if (this.changePreviousMenuLinkByCharature(tmp.toLowerCase())) {
                        flag = true;
                    }
                    break;
            }
        }
        else {
            switch (key) {
                case " ":
                    // console.log("case 1");
                    /* Add space and Enter Functionality */
                    break;
                case "Esc":
                case "Escape":
                    flag = true;
                    break;
                case "Up":
                case "ArrowUp":
                    this.closeSubMenu();
                    flag = true;
                    break;
                case "ArrowDown":
                case "Down":
                    this.openSubMenu(tgt);
                    flag = true;
                    break;
                case "ArrowRight":
                case "Right":
                    this.changeNextMenuLink();
                    flag = true;
                    break;
                case "ArrowLeft":
                case "Left":
                    this.changePreviousMenuLink();
                    flag = true;
                    break;
                case "Home":
                case "PageUp":
                    this.changeToFirstMenuLink();
                    flag = true;
                    break;
                case "End":
                case "PageDown":
                    this.changeToLastMenuLink();
                    flag = true;
                    break;
                // case "Tab":
                //     // Add Tab Functionality
                //     break;
                default:
                    let tmp = key.toString();
                    if (this.changeNextMenuLinkByCharature(tmp)) {
                        flag = true;
                    }
                    break;
            }
        }
        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    onLinkKeydown(event) {
        var tgt = event.currentTarget, key = event.key, flag = false;
        if (event.shiftKey) {
            switch (key) {
                case "Tab":
                    // flag = true;    
                    break;
                default:
                    let tmp = key.toString();
                    if (this.changePreviousMenuLinkByCharature(tmp.toLowerCase())) {
                        flag = true;
                    }
                    break;
            }
        }
        else {
            switch (key) {
                case " ":
                    // console.log("case 1");
                    /* Add space Functionality */
                    break;
                case "Esc":
                case "Escape":
                    flag = true;
                    break;
                case "Up":
                case "ArrowUp":
                    this.changePreviousMenuLink();
                    flag = true;
                    break;
                case "ArrowDown":
                case "Down":
                    this.changeNextMenuLink();
                    flag = true;
                    break;
                case "ArrowRight":
                case "Right":
                    this.openSubMenu(tgt);
                    flag = true;
                    break;
                case "ArrowLeft":
                case "Left":
                    this.closeSubMenu();
                    flag = true;
                    break;
                case "Home":
                case "PageUp":
                    this.changeToFirstMenuLink();
                    flag = true;
                    break;
                case "End":
                case "PageDown":
                    this.changeToLastMenuLink();
                    flag = true;
                    break;
                case "Tab":
                    // this.closeMenu();
                    // this.button.focus();
                    break;
                default:
                    let tmp = key.toString();
                    if (this.changeNextMenuLinkByCharature(tmp)) {
                        flag = true;
                    }
                    break;
            }
        }
        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    changeNextMenuLink() {
        let tmp = this.active_index + 1;
        if (tmp >= this.active_menu.length) {
            tmp = 0;
        }
        this.active_index = tmp;
        this.setMenuLinkFocus(this.active_menu[this.active_index]);
    }
    changePreviousMenuLink() {
        let tmp = this.active_index - 1;
        if (tmp < 0) {
            tmp = this.active_menu.length - 1;
        }
        this.active_index = tmp;
        this.setMenuLinkFocus(this.active_menu[this.active_index]);
    }
    changeNextMenuLinkByCharature(char) {
        let i = 0;
        let tmp;
        let flag = false;
        // link after active Link
        for (i = this.active_index + 1; i < this.active_menu.length; i++) {
            tmp = this.active_menu[i].innerHTML.trim().toLowerCase()[0];
            if (tmp === char) {
                this.active_index = i;
                this.setMenuLinkFocus(this.active_menu[i]);
                flag = true;
                break;
            }
        }
        //links before active Links 
        if (!flag) {
            for (i = 0; i <= this.active_index; i++) {
                tmp = this.active_menu[i].innerHTML.trim().toLowerCase()[0];
                if (tmp === char) {
                    this.active_index = i;
                    this.setMenuLinkFocus(this.active_menu[i]);
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }
    changePreviousMenuLinkByCharature(char) {
        let i = 0;
        let tmp;
        let flag = false;
        // link after active Link
        for (i = this.active_index - 1; i >= 0; i--) {
            tmp = this.active_menu[i].innerHTML.trim().toLowerCase()[0];
            if (tmp === char) {
                this.active_index = i;
                this.setMenuLinkFocus(this.active_menu[i]);
                flag = true;
                break;
            }
        }
        //links before active Links 
        if (!flag) {
            for (i = this.active_menu.length - 1; i >= this.active_index; i--) {
                tmp = this.active_menu[i].innerHTML.trim().toLowerCase()[0];
                if (tmp === char) {
                    this.active_index = i;
                    this.setMenuLinkFocus(this.active_menu[i]);
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }
    changeToLastMenuLink() {
        let t = this.active_menu.length - 1;
        this.active_index = t;
        this.setMenuLinkFocus(this.active_menu[t]);
    }
    changeToFirstMenuLink() {
        this.active_index = 0;
        this.setMenuLinkFocus(this.active_menu[0]);
    }
    openSubMenu(element) {
        let submenu = null;
        if (element.getAttribute("aria-haspopup") === "true") {
            let dropdown_icon = element.querySelector(".drop-down-arrow");
            let li = element.parentElement;
            let ul = li.querySelector("ul");
            submenu = this.getMenuLinks(ul);
            li.classList.add("background-highlight");
            li.classList.add("display-block");
            ul.classList.add("display-block");
            dropdown_icon.style.backgroundImage = `url("/assets/screen_Assets/icons/dropdown-arrow-up.svg")`;
            this.menu_stack.push(this.active_menu);
            this.active_index_stack.push(this.active_menu[this.active_index]);
            this.active_menu = submenu["menu_links"];
            this.active_menu.forEach(el => {
                el.setAttribute("tabindex", "-1");
                el.addEventListener("keydown", this.onLinkKeydown.bind(this));
                el.addEventListener("click", this.onMenuLinkClick.bind(this));
            });
            this.active_menu[0].setAttribute("tabindex", "0");
            this.active_index = -1;
            element.setAttribute("aria-expanded", "true");
            this.changeNextMenuLink();
        }
        else {
            this.setMenuLinkFocus(this.active_menu[this.active_index]);
        }
    }
    closeSubMenu() {
        if (this.menu_stack.length > 0) {
            this.setMenuLinkFocus(null);
            let tmp_menu = this.menu_stack.pop();
            // let t1 = ;
            let tmp_index = this.active_index_stack.pop();
            let a = tmp_index;
            let li = a.parentElement;
            li.classList.remove("background-highlight");
            li.classList.remove("display-block");
            let dropdown_icon = a.querySelector(".drop-down-arrow");
            if (dropdown_icon !== null) {
                let ul = li.querySelector("ul");
                ul.classList.remove("display-block");
                dropdown_icon.style.backgroundImage = `url("/assets/screen_Assets/icons/dropdown-arrow-down.svg")`;
            }
            a.setAttribute("aria-expanded", "false");
            // Set Global Variable
            this.active_menu = tmp_menu;
            this.active_index = this.LinkToIndex(tmp_index);
            this.setMenuLinkFocus(this.active_menu[this.active_index]);
        }
        else {
            this.setMenuLinkFocus(null);
        }
    }
    setMenuLinkFocus(newActiveLink) {
        this.active_menu.forEach((el) => {
            if (el === newActiveLink) {
                newActiveLink.tabIndex = 0;
                newActiveLink.focus();
            }
            else {
                el.tabIndex = -1;
            }
        });
    }
    getMenuLinks(element) {
        let tmpMenu = [];
        let t2 = element.querySelectorAll("li > a");
        t2.forEach((el) => {
            if (el.parentElement.parentElement === element) {
                tmpMenu.push(el);
            }
        });
        return { "menu_links": tmpMenu };
    }
    LinkToIndex(element) {
        let ans = -1;
        for (let index = 0; index < this.active_menu.length; index++) {
            if (element === this.active_menu[index]) {
                ans = index;
                break;
            }
        }
        return ans;
    }
}
//# sourceMappingURL=manubar.js.map