var POPUP_List = /** @class */ (function () {
    function POPUP_List(trigger, target) {
        this.notification_list = new Array();
        this.isFocuse = false;
        this.active_index = 0;
        this.firstNotification = null;
        this.lastNotification = null;
        this.trigger = trigger;
        this.target = target;
        var nodes = target.querySelectorAll("li");
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
        this.trigger.parentElement.addEventListener("focusout", this.closeList.bind(this));
    };
    POPUP_List.prototype.openList = function () {
        this.trigger.setAttribute("aria-expanded", "true");
        this.target.classList.add("show-list");
        this.target.setAttribute("aria-hidden", "false");
        this.isFocuse = true;
    };
    POPUP_List.prototype.closeList = function () {
        this.trigger.setAttribute("aria-expanded", "false");
        this.target.classList.remove("show-list");
        this.target.setAttribute("aria-hidden", "true");
        this.isFocuse = false;
    };
    POPUP_List.prototype.onButtonClick = function (event) {
        if (this.isOpen()) {
            this.closeList();
            this.trigger.focus();
        }
        else {
            this.openList();
            // this.setFocusTofirstNotification();
        }
    };
    POPUP_List.prototype.onButtonKeydown = function (event) {
        console.log("Key Down event");
        var key = event.key, flag = false;
        switch (key) {
            case " ":
            case "Enter":
            case "ArrowDown":
            case "Down":
                this.openList();
                this.setFocusToFirstNotification();
                flag = true;
                break;
            case "Esc":
            case "Escape":
                this.closeList();
                this.trigger.focus();
                flag = true;
                break;
            case "Up":
            case "ArrowUp":
                this.openList();
                this.setFocusToLastNotification();
                flag = true;
                break;
            default:
                break;
        }
        if (flag) {
            console.log("flag change");
            event.stopPropagation();
            event.preventDefault();
        }
    };
    POPUP_List.prototype.onNotificationKeydown = function (event) {
        var tgt = event.currentTarget, key = event.key, flag = false;
        if (event.ctrlKey || event.altKey || event.metaKey) {
            return;
        }
        if (event.shiftKey) {
            if (event.key === "Tab") {
                this.trigger.focus();
                this.closeList();
                flag = true;
            }
        }
        else {
            switch (key) {
                case " ":
                    window.location.href = tgt.href;
                    break;
                case "Esc":
                case "Escape":
                    this.closeList();
                    this.trigger.focus();
                    flag = true;
                    break;
                case "Up":
                case "ArrowUp":
                    this.setFocusToPreviousNotification(tgt);
                    flag = true;
                    break;
                case "ArrowDown":
                case "Down":
                    this.setFocusToNextNotification(tgt);
                    flag = true;
                    break;
                case "Home":
                case "PageUp":
                    this.setFocusToFirstNotification();
                    flag = true;
                    break;
                case "End":
                case "PageDown":
                    this.setFocusToLastNotification();
                    flag = true;
                    break;
                case "Tab":
                    this.closeList();
                    break;
                default:
                    break;
            }
        }
        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
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