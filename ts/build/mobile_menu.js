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
        this.button = element.querySelector(".toggle-btn-span");
        this.menu = element.querySelector("nav");
        this.button.addEventListener("click", this.openMenu.bind(this));
        // this.domNode.addEventListener("focusout", this.closeMenu.bind(this));    
        this.button.addEventListener("keydown", this.onToggleKeydown.bind(this));
        this.active_index = -1;
        this.menu_structure = [];
        this.menu_stack = [];
        this.active_index_stack = [];
        this.active_menu = null;
        var tmp = this.menu.querySelectorAll("ul > li");
        var allLinkList = [];
        tmp.forEach(function (el) {
            if (el.parentElement.parentElement === _this.menu) {
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
                        "link": el.querySelector("a"),
                        "submenu_link": t2_1
                    });
                }
                else {
                    var t1 = el.querySelector("a");
                    _this.menu_structure.push({
                        "link": t1,
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
            console.log("Link Element");
            console.log(el);
            el.setAttribute("tabindex", "-1");
            el.addEventListener("keydown", _this.onLinkKeydown.bind(_this));
        });
        console.log("Menue structure");
        console.log(this.menu_structure);
        console.log("AllLink List");
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
                    this.changePreviousMenuLink();
                    flag = true;
                    break;
                case "ArrowDown":
                case "Down":
                    console.log("case 4");
                    this.changeNextMenuLink();
                    flag = true;
                    break;
                case "ArrowRight":
                case "Right":
                    console.log("Arrow Left Pressed ");
                    this.openSubMenu(tgt);
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
                    console.log(key);
                    break;
            }
        }
        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    };
    MobileMenu.prototype.changeNextMenuLink = function () {
        console.log("Change Next Menu link called");
        console.log("active Menu index", this.active_index);
        var tmp = this.active_index + 1;
        if (tmp > this.active_menu.length) {
            tmp = 0;
        }
        this.active_index = tmp;
        this.setFocus(this.active_menu, this.active_menu[this.active_index]);
    };
    MobileMenu.prototype.changePreviousMenuLink = function () {
        console.log("Change Previous Menu link called");
        console.log("active Menu index", this.active_index);
        var tmp = this.active_index - 1;
        if (tmp < 0) {
            tmp = this.active_menu.length;
        }
        this.active_index = tmp;
        this.setFocus(this.active_menu, this.active_menu[this.active_index]);
    };
    MobileMenu.prototype.openSubMenu = function (element) {
        // let submenu = element["submenu_link"];
        // if (submenu.length !== 0) {
        //     this.menu_stack.push(this.active_menu);
        //     this.active_index_stack.push(this.active_index);
        //     this.active_menu = submenu;
        //     this.active_index = 0;
        // }
        var submenu = null;
        if (this.hasPopupMenu(element)) {
            var dropdown_icon = element.querySelector(".drop-down-arrow");
            var li = element.parentElement;
            var ul = li.querySelector("ul");
            submenu = this.getMenuLinks(ul);
            li.classList.add("background-highlight");
            li.classList.add("display-block");
            ul.classList.add("display-block");
            dropdown_icon.style.backgroundImage = "url(\"/assets/screen_Assets/icons/dropdown-arrow-up.svg\")";
            this.menu_stack.push(this.active_menu);
            this.active_menu = submenu;
            this.active_index_stack.push(this.active_index);
            this.active_index = 0;
            element.setAttribute("aria-expanded", "true");
            console.log("Open Submenu called");
            console.log(submenu);
            this.setSubMenuFocus(submenu[0]);
            // let a = ul.quer
        }
        console.log("Open Submenu called");
        console.log(submenu);
    };
    MobileMenu.prototype.getMenuLinks = function (element) {
        var tmpMenu = [];
        var t2 = element.querySelectorAll("li > a");
        t2.forEach(function (el) {
            console.log(el);
            if (el.parentElement.parentElement === element) {
                tmpMenu.push(el);
            }
        });
        return tmpMenu;
    };
    MobileMenu.prototype.hasPopupMenu = function (element) {
        return element.getAttribute("aria-haspopup") === "true";
    };
    MobileMenu.prototype.getNewActiveMenu = function () {
        var t = [];
        var ans = this.menu_structure;
        this.active_index_stack.forEach(function (index) {
            ans = ans[index]["submenu_link"];
        });
        return ans;
    };
    MobileMenu.prototype.setFocus = function (elements, new_active_menu) {
        console.log("set Focus Called");
        console.log(elements);
        console.log(new_active_menu);
        elements.forEach(function (el) {
            if (el === new_active_menu) {
                console.log("Set Focue");
                console.log(el["link"]);
                new_active_menu["link"].tabIndex = 0;
                new_active_menu["link"].focus();
                console.log(new_active_menu["link"]);
            }
            else {
                el["link"].tabIndex = -1;
            }
        });
    };
    MobileMenu.prototype.setSubMenuFocus = function (newActiveLink) {
        this.active_menu.forEach(function (el) {
            if (el === newActiveLink) {
                newActiveLink.tabIndex = 0;
                newActiveLink.focus();
                console.log(newActiveLink);
            }
            else {
                el.tabIndex = -1;
            }
        });
    };
    MobileMenu.prototype.openMenu = function () {
        this.button.setAttribute("aria-expanded", "true");
        this.menu.classList.add("show");
        var t = this.active_index == -1 ? 0 : this.active_index;
        console.log("Open Menue Btn");
        console.log(this.active_menu[t]);
        this.setFocus(this.active_menu, this.active_menu[t]);
    };
    MobileMenu.prototype.closeMenu = function () {
        console.log("Close Menu");
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