export class MobileMenu {
    domNode: HTMLDivElement;
    button: SVGSVGElement;
    menu: HTMLElement;
    active_index: number;
    active_index_stack: Array<HTMLAnchorElement>;
    active_menu: Array<HTMLAnchorElement>;
    menu_stack: Array<Array<HTMLAnchorElement>>;

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
        this.button = element.querySelector(".toggle-btn-span");
        this.menu = element.querySelector("nav");

        this.button.addEventListener("click", this.toggleMenu.bind(this));
        // this.button.parentElement.addEventListener("mouseenter", this.openMenu.bind(this));
        // this.button.parentElement.addEventListener("mouseleave", this.closeMenu.bind(this));
        // this.domNode.addEventListener("focusout", this.closeMenu.bind(this));    

        this.button.addEventListener("keydown", this.onToggleKeydown.bind(this));
        this.active_index = -1;
        this.menu_stack = [];
        this.active_index_stack = [];
        this.active_menu = null;

  
        let tmp = this.menu.querySelectorAll("a");
        tmp.forEach(el => {
            el.setAttribute("tabindex", "-1");
            el.addEventListener("keydown", this.onLinkKeydown.bind(this));
            el.addEventListener("click", this.onMenuLinkClick.bind(this));
        })

        let main_ul: HTMLUListElement = element.querySelector("nav > ul");
        let main_menu = this.getMenuLinks(main_ul);
        console.log("Link Got from Function");
        console.log(main_menu);
        this.active_menu = main_menu;
    }

    onMenuLinkClick(event:MouseEvent) {
        let tgt: HTMLAnchorElement = event.target as HTMLAnchorElement;
        this.closeSubMenu();
        this.active_index = this.LinkToIndex(tgt);
        this.openSubMenu(tgt);
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
        var tgt = event.currentTarget as HTMLAnchorElement,
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
                    console.log("Arrow Right Pressed ");
                    this.openSubMenu(tgt);
                    flag = true;
                    break;

                case "ArrowLeft":
                case "Left":
                    console.log("Arrow Left Pressed ");
                    this.closeSubMenu();
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
    }


    changeNextMenuLink() {
        console.log("Change Next Menu link called");
        console.log("active Menu index", this.active_index);
        let tmp = this.active_index + 1;
        if (tmp >= this.active_menu.length) {
            tmp = 0;
        }
        this.active_index = tmp;
        this.setMenuLinkFocus(this.active_menu[this.active_index]);
    }

    changePreviousMenuLink() {
        console.log("Change Previous Menu link called");
        console.log("active Menu index", this.active_index);
        let tmp = this.active_index - 1 ;
        if (tmp < 0) {
            tmp = this.active_menu.length -1 ;
        }
        this.active_index = tmp;
        this.setMenuLinkFocus(this.active_menu[this.active_index]);
    
    }

    openSubMenu(element:HTMLAnchorElement) {
        
        let submenu = null;
        if (element.getAttribute("aria-haspopup") === "true") {
            let dropdown_icon = element.querySelector(".drop-down-arrow") as HTMLSpanElement;
            let li = element.parentElement as HTMLLIElement;
            let ul = li.querySelector("ul") as HTMLUListElement;
            
            submenu = this.getMenuLinks(ul);
            
            li.classList.add("background-highlight");
            li.classList.add("display-block");
            ul.classList.add("display-block");
            dropdown_icon.style.backgroundImage = `url("/assets/screen_Assets/icons/dropdown-arrow-up.svg")`;
            
            this.menu_stack.push(this.active_menu);
            this.active_index_stack.push(this.active_menu[this.active_index]);
            this.active_menu = submenu;
            this.active_index = -1;

            element.setAttribute("aria-expanded", "true");
            console.log("Open Submenu called");
            console.log(submenu);
            this.changeNextMenuLink();
            // let a = ul.quer
        }
        else {
            this.setMenuLinkFocus(this.active_menu[this.active_index]);
        }
        console.log("Open Submenu called")
        console.log(submenu);
    }

    closeSubMenu() {
        if (this.menu_stack.length > 0) {
            this.setMenuLinkFocus(null);

            let tmp_menu: Array<HTMLAnchorElement> = this.menu_stack.pop();
            // let t1 = ;
            let tmp_index : HTMLAnchorElement = this.active_index_stack.pop();

            let a:HTMLAnchorElement = tmp_index;
            let li = a.parentElement as HTMLLIElement;
            li.classList.remove("background-highlight");
            li.classList.remove("display-block");

            let dropdown_icon = a.querySelector(".drop-down-arrow") as HTMLSpanElement;
            
            let t = {
                tmp_index,
                tmp_menu,
                a,
                dropdown_icon,
                li,
            }
            console.log("Values");
            console.log(t);

            if (dropdown_icon !== null) {
                let ul = li.querySelector("ul") as HTMLUListElement;
               
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

    getMenuLinks(element: HTMLUListElement) {
        let tmpMenu = [];
        let t2 = element.querySelectorAll("li > a");
        t2.forEach((el:HTMLAnchorElement) => {
            if (el.parentElement.parentElement === element) {
                tmpMenu.push(el);
            }
        })
        return tmpMenu;
    }

    setMenuLinkFocus(newActiveLink:HTMLAnchorElement) {

        this.active_menu.forEach((el: HTMLAnchorElement) => {
            if (el === newActiveLink) {
                newActiveLink.tabIndex = 0;
                newActiveLink.focus();
                // console.log(newActiveLink);
            }
            else {
                el.tabIndex = -1;
            }
        })
    }

    openMenu() {
        this.button.setAttribute("aria-expanded", "true");
        this.menu.classList.add("show");
        let t = this.active_index == -1 ? 0 : this.active_index;
        this.setMenuLinkFocus(this.active_menu[t]);
        this.active_index = t;
    }
    closeMenu() {
        console.log("Close Menu")
        if (this.isOpen()) {
            this.button.setAttribute("aria-expanded", "false");
            this.menu.classList.remove("show");
            this.setMenuLinkFocus(null);
        }
    }
    toggleMenu() {
        if (this.isOpen()) {
            this.closeMenu();
        }
        else {
            this.openMenu()
        }
    }
    isOpen() {
        return this.button.getAttribute("aria-expanded") === "true";
    }

    LinkToIndex(element : HTMLAnchorElement):number {
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