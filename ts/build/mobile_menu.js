var MobileMenu = /** @class */ (function () {
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
    function MobileMenu(element) {
        var _this = this;
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
        var tmp = this.menu.querySelectorAll("ul > li");
        var allLinkList = [];
        tmp.forEach(function (el) {
            if (el.parentElement.parentElement === _this.menu) {
                // list.push(el);
                // console.log(el);
                if (el.classList.contains("dropdown-list-container")) {
                    var tmp1 = el.querySelector("ul");
                    console.log(tmp1);
                    var t1 = tmp1.querySelectorAll("a");
                    var t2_1 = [];
                    t1.forEach(function (el1) {
                        // if (el1.getAttribute("aria-haspopup") === "true") {
                        //     // console.log(el1);
                        // }
                        t2_1.push(el1);
                    });
                    _this.menu_structure.push({
                        "link": el,
                        "submenu_link": t2_1
                    });
                }
                else {
                    var t1 = el.querySelector("a");
                    console.log("t1");
                    console.log(t1);
                    _this.menu_structure.push({
                        "link": el,
                        "submenu_link": []
                    });
                }
            }
        });
        tmp = this.menu.querySelectorAll("a");
        var menu_structur_1 = [];
        var t = {};
        var subLink = [];
        var flag = true;
        tmp.forEach(function (el) {
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
            else if (!flag) {
                subLink.push(el);
            }
            allLinkList.push(el);
            el.addEventListener("kwydown", _this.onLinkKeydown.bind(_this));
        });
        console.log(this.menu_structure);
        console.log(allLinkList);
        console.log(menu_structur_1);
        this.active_menu = this.menu_structure;
    }
    MobileMenu.prototype.onToggleKeydown = function (event) {
        console.log("Button Key Down event");
        var key = event.key, flag = false;
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
                console.log("Key Buiding is not Avaliable");
                break;
        }
        if (flag) {
            console.log("flag change");
            event.stopPropagation();
            event.preventDefault();
        }
    };
    MobileMenu.prototype.onLinkKeydown = function (event) {
        console.log("Notification Keydown Event called");
        var tgt = event.currentTarget, key = event.key, flag = false;
        // if (event.ctrlKey || event.altKey || event.metaKey) {
        //     return;
        // }
        if (event.shiftKey) {
            if (event.key === "Tab") {
                this.button.focus();
                this.closeMenu();
                flag = true;
            }
        }
        else {
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
    };
    MobileMenu.prototype.changNextMenueLink = function () {
        var tmp = this.active_index + 1;
        if (tmp > this.active_menu.length) {
            tmp = 0;
        }
        this.active_index = tmp;
        this.setFocus(this.active_menu, this.active_menu[this.active_index]);
    };
    MobileMenu.prototype.getNewActiveMenu = function () {
        var t = [];
        var ans = this.menu_structure;
        this.active_levels_index.forEach(function (index) {
            ans = ans[index]["submenu_link"];
        });
        return ans;
    };
    MobileMenu.prototype.setFocus = function (elements, new_active_menu) {
        elements.forEach(function (el) {
            if (el === new_active_menu) {
                el["link"].tabIndex = 0;
                new_active_menu["link"].focus();
            }
            else {
                el["link"].tabIndex = -1;
            }
        });
    };
    MobileMenu.prototype.openMenu = function () {
        this.button.setAttribute("aria-expanded", "true");
        this.menu.classList.add("show");
        var t = this.active_index == -1 ? 0 : this.active_index;
        this.setFocus(this.active_menu, this.active_menu[t]);
    };
    MobileMenu.prototype.closeMenu = function () {
        if (this.isOpen()) {
            this.button.setAttribute("aria-expanded", "false");
            this.menu.classList.remove("show");
            this.setFocus(this.active_menu, null);
        }
    };
    MobileMenu.prototype.isOpen = function () {
        return this.button.getAttribute("aria-expanded") === "true";
    };
    return MobileMenu;
}());
export { MobileMenu };
//# sourceMappingURL=mobile_menu.js.map