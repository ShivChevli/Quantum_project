export class POPUP_List{
    trigger: HTMLSpanElement;
    target: HTMLDivElement;
    notification_list: HTMLLIElement[] = new Array();
    isFocuse = false;
    active_index = 0;
    firstNotification = null;
    lastNotification = null;
    
    constructor(trigger:HTMLSpanElement, target:HTMLDivElement) {
        this.trigger = trigger;
        this.target = target;
        let nodes = target.querySelectorAll<'li'>("li");
        
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
    init() {
        this.trigger.addEventListener("click", this.onButtonClick.bind(this));
        this.trigger.addEventListener("keydown", this.onButtonKeydown.bind(this));
        // this.trigger.addEventListener("keydown", this.listnerCloseList.bind(this),false);
        this.trigger.parentElement.addEventListener("focusout", this.closeList.bind(this));       
    }
    openList() {
        this.trigger.setAttribute("aria-expanded", "true");
        this.target.classList.add("show-list");
        this.target.setAttribute("aria-hidden", "false");
        this.isFocuse = true;
    }
    closeList() {
        this.trigger.setAttribute("aria-expanded", "false");
        this.target.classList.remove("show-list");
        this.target.setAttribute("aria-hidden", "true");
        this.isFocuse = false;
    }

    onButtonClick(event) {
        if (this.isOpen()) {
            this.closeList();
            this.trigger.focus();
        } else {
            this.openList();
            // this.setFocusTofirstNotification();
        }
    }

    onButtonKeydown(event) {
    console.log("Key Down event");
    var key = event.key,
      flag = false;

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
        console.log("flag change")
      event.stopPropagation();
      event.preventDefault();
    }
    }
    
    onNotificationKeydown(event) {
    var tgt = event.currentTarget,
        key = event.key,
        flag = false;


    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }

    if (event.shiftKey) {
        
        if (event.key === "Tab") {
        this.trigger.focus();
        this.closeList();
        flag = true;
        }
    } else {
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
    }

    isOpen() {
        return this.trigger.getAttribute("aria-expanded") === "true";
    }

    setFocusToPreviousNotification(currentMenuitem) {
    var newNotification, index;

    if (currentMenuitem === this.firstNotification) {
      newNotification = this.lastNotification;
    } else {
      index = this.notification_list.indexOf(currentMenuitem);
      newNotification = this.notification_list[index - 1];
    }

    this.setFocusToNotification(newNotification);

    return newNotification;
    }
    
    
    setFocusToNextNotification(currentMenuitem) {
    var newNotification, index;

    if (currentMenuitem === this.lastNotification) {
        newNotification = this.firstNotification;
    } else {
        index = this.notification_list.indexOf(currentMenuitem);
        newNotification = this.notification_list[index + 1];
    }
    this.setFocusToNotification(newNotification);

    return newNotification;
    }

    
    setFocusToFirstNotification() {
        this.setFocusToNotification(this.firstNotification);
    }

    setFocusToLastNotification() {
        this.setFocusToNotification(this.lastNotification);
    }

    setFocusToNotification(newNotification) {
    this.notification_list.forEach(function (item) {
      if (item === newNotification) {
        item.tabIndex = 0;
        newNotification.focus();
      } else {
        item.tabIndex = -1;
      }
    });
    }
}
