export class MobileMenu {
    domNode: HTMLDivElement;
    button: SVGSVGElement;
    menu: HTMLElement;
    active_index: number;
    menu_structure: Array<Object>;
    active_levels_index: Array<number>;
    active_menu: Array<Object>;

    // menuitems: HTMLElement[];
    // popups: HTMLElement[];
    // menuitemGroups: any;
    // menuOrientation: any;
    // isPopup: any;
    // isPopout: any;
    // openPopups: boolean;
    // firstChars: any;
    // firstMenuitem: any;
    // lastMenuitem: any;

    constructor(element: HTMLDivElement) {
        this.domNode = element;
        this.button = element.querySelector("svg");
        this.menu = element.querySelector("nav");

        this.domNode.addEventListener("click", this.openMenu.bind(this));
        this.domNode.addEventListener("focusout", this.closeMenu.bind(this));

        this.domNode.addEventListener("keydown", this.onToggleKeydown.bind(this));
        this.active_index = -1;
        this.menu_structure = [];
        this.active_levels_index = [];
        this.active_menu = null;

        let tmp = this.menu.querySelectorAll("ul > li");
        let allLinkList = [];
        tmp.forEach(el => {
            if (el.parentElement.parentElement === this.menu) {
                // list.push(el);
                // console.log(el);
                if (el.classList.contains("dropdown-list-container")) {
                    let tmp1 = el.querySelector("ul");
                    console.log(tmp1);
                    let t1 = tmp1.querySelectorAll("a");
                    let t2 = [];
                    t1.forEach(el1 => {
                        // if (el1.getAttribute("aria-haspopup") === "true") {
                        //     // console.log(el1);
                        // }
                        t2.push(el1);
                    })
                    this.menu_structure.push({
                        "link": el,
                        "submenu_link": t2
                    })
                }
                else {
                    let t1 = el.querySelector("a");
                    console.log("t1");
                    console.log(t1);
                    this.menu_structure.push({
                        "link" : el,
                        "submenu_link" : []
                    })
                }
            }

        })
        tmp = this.menu.querySelectorAll("a");
        let menu_structur_1 = [];
        let t = {};
        let subLink = [];
        let flag = true;
        tmp.forEach(el => {

            if (flag) {
                t["link"] = el;
                flag = false;
            }

            if (el.getAttribute("aria-haspopup") === "true") {
                console.log("Parent element");
                t["sub_menu"] = subLink;
                menu_structur_1.push(t);
                t = {};
                subLink = [];
                flag = true;
            }
            else if(!flag) {
                subLink.push(el);
            }
            allLinkList.push(el);
            el.addEventListener("kwydown", this.onLinkKeydown.bind(this));
        })
        console.log(this.menu_structure);
        console.log(allLinkList);
        console.log(menu_structur_1);
        this.active_menu = this.menu_structure;
    }

    onToggleKeydown(event) {
        console.log("Button Key Down event");
        var key = event.key,
            flag = false;

        switch (key) {
            case " ":
            case "Enter":
            case "ArrowDown":
            case "Down":
                console.log("Case 1");
                this.openMenu();
                // this.setFocusToFirstNotification();
                flag = true;
                break;

            case "Esc":
            case "Escape":
                // console.log("Notifation close");
                console.log("Case 2");
                this.closeMenu();
                // this.trigger.focus();
                flag = true;
                break;

            case "Up":
            case "ArrowUp":
                // console.log("Notifation Open");
                console.log("Case 3");
                this.openMenu();
                // this.setFocusToLastNotification();
                flag = true;
                break;

            default:
                console.log("default case");
                console.log("Key Buiding is not Avaliable")
                break;
        }

        if (flag) {
            console.log("flag change")
            event.stopPropagation();
            event.preventDefault();
        }
    }

    onLinkKeydown(event) {
        console.log("Notification Keydown Event called");
        var tgt = event.currentTarget,
            key = event.key,
            flag = false;


        // if (event.ctrlKey || event.altKey || event.metaKey) {
        //     return;
        // }

        if (event.shiftKey) {

            if (event.key === "Tab") {
                this.button.focus();
                this.closeMenu();
                flag = true;
            }
        } else {
            switch (key) {
                case " ":
                    console.log("case 1");
                    /* Add space Functionality */

                    break;

                case "Esc":
                case "Escape":
                    console.log("case 2");
                    this.closeMenu();
                    this.button.focus();
                    flag = true;
                    break;

                case "Up":
                case "ArrowUp":
                    console.log("case 3");
                    // this.setFocusToPreviousNotification(tgt);
                    this.changNextMenueLink();
                    flag = true;
                    break;

                case "ArrowDown":
                case "Down":
                    console.log("case 4");
                    this.changNextMenueLink();
                    flag = true;
                    break;

                case "Home":
                case "PageUp":
                    console.log("case 5");
                    // this.setFocusToFirstNotification();
                    flag = true;
                    break;

                case "End":
                case "PageDown":
                    console.log("case 6");
                    // this.setFocusToLastNotification();
                    flag = true;
                    break;

                case "Tab":
                    console.log("case 7");
                    this.closeMenu();
                    break;

                default:
                    console.log("Default Case");
                    break;
            }
        }
        
        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    }


    changNextMenueLink() {
        let tmp = this.active_index + 1;
        if (tmp > this.active_menu.length) {
            tmp = 0;
        }
        this.active_index = tmp;
        this.setFocus(this.active_menu, this.active_menu[this.active_index]);
    }

    getNewActiveMenu() {
        let t = [];
        let ans = this.menu_structure;
        this.active_levels_index.forEach(index => {
            ans = ans[index]["submenu_link"];
        })
        return ans;
    }
    
    setFocus(elements,new_active_menu) {
        elements.forEach(el => {
            if (el === new_active_menu) {
                el["link"].tabIndex = 0;
                new_active_menu["link"].focus();
            }
            else {
                el["link"].tabIndex = -1;
            }
        })
    }

    openMenu() {
        this.button.setAttribute("aria-expanded", "true");
        this.menu.classList.add("show");
        let t = this.active_index == -1 ? 0 : this.active_index;
        this.setFocus(this.active_menu, this.active_menu[t]);
    }
    closeMenu() {
        if (this.isOpen()) {
            this.button.setAttribute("aria-expanded", "false");
            this.menu.classList.remove("show");
            this.setFocus(this.active_menu, null);
        }
    }
    isOpen() {
        return this.button.getAttribute("aria-expanded") === "true";
    }
}