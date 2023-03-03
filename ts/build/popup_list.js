var POPUP_List = /** @class */ (function () {
    function POPUP_List(trigger, target) {
        var _this = this;
        this.notification_list = new Array();
        this.isFocuse = false;
        this.active_index = 0;
        this.firstNotification = null;
        this.lastNotification = null;
        this.trigger = trigger;
        this.target = target;
        var nodes = target.querySelectorAll("li");
        var t = target.querySelector(".action-btn-div");
        var t1 = t.querySelectorAll("span");
        var tmp = [];
        t1.forEach(function (el) {
            tmp.push(el);
            el.tabIndex = -1;
            el.addEventListener("keydown", _this.onActionBtnKeyDown.bind(_this));
        });
        this.footerBtn = tmp;
        this.active_action_btn_index = -1;
        console.log(this.footerBtn);
        for (var i = 0; i < nodes.length; i++) {
            var menuitem = nodes[i];
            this.notification_list.push(menuitem);
            menuitem.tabIndex = -1;
            menuitem.addEventListener("keydown", this.onNotificationKeydown.bind(this));
            //   menuitem.addEventListener(
            //     "mouseover",
            //     this.onMenuitemMouseover.bind(this)
            //   );
            if (!this.firstNotification) {
                this.firstNotification = menuitem;
            }
            this.lastNotification = menuitem;
        }
    }
    POPUP_List.prototype.init = function () {
        this.trigger.addEventListener("click", this.onButtonClick.bind(this));
        this.trigger.addEventListener("keydown", this.onButtonKeydown.bind(this));
        // this.trigger.addEventListener("keydown", this.listnerCloseList.bind(this),false);
        // this.trigger.parentElement.addEventListener("focusout", this.closeList.bind(this));       
    };
    POPUP_List.prototype.openList = function () {
        console.log("Open List function Called");
        this.trigger.setAttribute("aria-expanded", "true");
        this.target.classList.add("show-list");
        this.target.setAttribute("aria-hidden", "false");
        // this.trigger.focus();
        this.isFocuse = true;
    };
    POPUP_List.prototype.closeList = function () {
        console.log("Close List function Called");
        this.trigger.setAttribute("aria-expanded", "false");
        this.target.classList.remove("show-list");
        this.target.setAttribute("aria-hidden", "true");
        this.setFocusToNotification(null);
        this.setActionBtn(null);
        this.isFocuse = false;
    };
    POPUP_List.prototype.onButtonClick = function (event) {
        if (this.isOpen()) {
            console.log("Btn Close Out");
            this.closeList();
            this.trigger.focus();
        }
        else {
            this.openList();
            // this.setFocusTofirstNotification();
        }
    };
    POPUP_List.prototype.onButtonKeydown = function (event) {
        console.log("Button Key Down event");
        var key = event.key, flag = false;
        switch (key) {
            case " ":
            case "Enter":
            case "ArrowDown":
            case "Down":
                console.log("Case 1");
                this.openList();
                this.setFocusToFirstNotification();
                flag = true;
                break;
            case "Esc":
            case "Escape":
                // console.log("Notifation close");
                console.log("Case 2");
                this.closeList();
                this.trigger.focus();
                flag = true;
                break;
            case "Up":
            case "ArrowUp":
                // console.log("Notifation Open");
                console.log("Case 3");
                this.openList();
                this.setFocusToLastNotification();
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
    POPUP_List.prototype.onNotificationKeydown = function (event) {
        console.log("Notification Keydown Event called");
        var tgt = event.currentTarget, key = event.key, flag = false;
        if (event.ctrlKey || event.altKey || event.metaKey) {
            return;
        }
        if (event.shiftKey) {
            switch (key) {
                case " ":
                    console.log("Press Space");
                    /* Add space Functionality */
                    break;
                case "Tab":
                    this.trigger.focus();
                    this.closeList();
                    flag = true;
                    break;
                case "ArrowDown":
                case "ArrowUp":
                    var t = this.active_action_btn_index === -1 ? 0 : this.active_action_btn_index;
                    this.setFocusToNotification(null);
                    this.setActionBtn(this.footerBtn[t]);
                    this.active_action_btn_index = t;
                    break;
                default:
                    break;
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
                    this.closeList();
                    this.trigger.focus();
                    flag = true;
                    break;
                case "Up":
                case "ArrowUp":
                    console.log("case 3");
                    this.setFocusToPreviousNotification(tgt);
                    flag = true;
                    break;
                case "ArrowDown":
                case "Down":
                    console.log("case 4");
                    this.setFocusToNextNotification(tgt);
                    flag = true;
                    break;
                case "Home":
                case "PageUp":
                    console.log("case 5");
                    this.setFocusToFirstNotification();
                    flag = true;
                    break;
                case "End":
                case "PageDown":
                    console.log("case 6");
                    this.setFocusToLastNotification();
                    flag = true;
                    break;
                case "Tab":
                    console.log("case 7");
                    this.closeList();
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
    POPUP_List.prototype.onActionBtnKeyDown = function (event) {
        var t = this.active_action_btn_index;
        var key = event.key, flag = false;
        if (event.shiftKey) {
            switch (key) {
                case "Tab":
                    this.trigger.focus();
                    this.closeList();
                    flag = true;
                    break;
                case "ArrowDown":
                    this.setActionBtn(null);
                    this.setFocusToFirstNotification();
                    break;
                case "ArrowUp":
                    this.setActionBtn(null);
                    this.setFocusToLastNotification();
                    break;
                default:
                    console.log("Shift Btn default");
                    break;
            }
        }
        else {
            switch (key) {
                case " ":
                case "Enter":
                    console.log("Active Btn");
                    break;
                // case "Tab":
                //   console.log("Tab Btn click")
                //   this.setFocusToFirstNotification();
                //   break;
                case "ArrowDown":
                case "Down":
                    t++;
                    if (t >= this.footerBtn.length) {
                        t = 0;
                    }
                    this.setActionBtn(this.footerBtn[t]);
                    flag = true;
                    break;
                case "Esc":
                case "Escape":
                case "Tab":
                    this.closeList();
                    this.trigger.focus();
                    flag = true;
                    break;
                case "Up":
                case "ArrowUp":
                    t--;
                    if (t < 0) {
                        t = this.footerBtn.length - 1;
                    }
                    this.setActionBtn(this.footerBtn[t]);
                    flag = true;
                    break;
                default:
                    console.log("default case");
                    console.log("Key Buiding is not Avaliable");
                    break;
            }
        }
        this.active_action_btn_index = t;
        if (flag) {
            console.log("flag change");
            event.stopPropagation();
            event.preventDefault();
        }
    };
    POPUP_List.prototype.setActionBtn = function (target) {
        console.log("set action btn called");
        console.log(target);
        this.footerBtn.forEach(function (el) {
            if (el === target) {
                el.tabIndex = 0;
                el.focus();
            }
            else {
                el.tabIndex = -1;
            }
        });
    };
    POPUP_List.prototype.isOpen = function () {
        return this.trigger.getAttribute("aria-expanded") === "true";
    };
    POPUP_List.prototype.setFocusToPreviousNotification = function (currentMenuitem) {
        var newNotification, index;
        if (currentMenuitem === this.firstNotification) {
            newNotification = this.lastNotification;
        }
        else {
            index = this.notification_list.indexOf(currentMenuitem);
            newNotification = this.notification_list[index - 1];
        }
        this.setFocusToNotification(newNotification);
        return newNotification;
    };
    POPUP_List.prototype.setFocusToNextNotification = function (currentMenuitem) {
        var newNotification, index;
        if (currentMenuitem === this.lastNotification) {
            newNotification = this.firstNotification;
        }
        else {
            index = this.notification_list.indexOf(currentMenuitem);
            newNotification = this.notification_list[index + 1];
        }
        this.setFocusToNotification(newNotification);
        return newNotification;
    };
    POPUP_List.prototype.setFocusToFirstNotification = function () {
        this.setFocusToNotification(this.firstNotification);
    };
    POPUP_List.prototype.setFocusToLastNotification = function () {
        this.setFocusToNotification(this.lastNotification);
    };
    POPUP_List.prototype.setFocusToNotification = function (newNotification) {
        this.notification_list.forEach(function (item) {
            if (item === newNotification) {
                item.tabIndex = 0;
                newNotification.focus();
            }
            else {
                item.tabIndex = -1;
            }
        });
    };
    return POPUP_List;
}());
export { POPUP_List };
//# sourceMappingURL=popup_list.js.map