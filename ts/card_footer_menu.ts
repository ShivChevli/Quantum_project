export class CardFooterMenu{
    menu: HTMLDivElement;
    menu_items: Array<HTMLButtonElement>
    first_menu: HTMLButtonElement;
    last_menu: HTMLButtonElement;
    active_menu: number;
    menu_length: number;
    next_element: HTMLElement;

    constructor(element:HTMLDivElement) {
        this.menu = element;
        let t1 = element.querySelectorAll("button[role='menuitem']");
        this.menu_items = [];
        t1.forEach((el: HTMLButtonElement) => {
            this.menu_items.push(el);
            el.tabIndex = -1;
            el.addEventListener("keydown", this.onMenuKeydown.bind(this));
        });
        this.menu_items[0].tabIndex = 0;
        this.active_menu = 0;
        this.menu_length = this.menu_items.length;
    }
    onMenuKeydown(event:KeyboardEvent){
        let key = event.key;
        let flag = false;

        switch (key) {
            case "left":
            case "ArrowLeft":
            case "ArrowUp":
                this.setFocusToPreviousMenuItem();
                flag = true;
                break;
            
            case "right":
            case "ArrowRight":
            case "ArrowDown":
                this.setFocusToNextMenuItem();
                flag = true;
                break;
            
            case "Enter":
            case " ":
                break;
            
            case "End":
            case "PageDown":
                this.setFocusToLastMenuItem();
                flag = true;
                break;
                
            case "Home":
            case "PageUp":
                this.setFocusToFirstMenuItem();
                flag = true;
                break;
            
            default:
                console.log(`Key binding is not avalable for key ${key}`);
                break;
        }

        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    setFocusToNextMenuItem() {
        this.active_menu++;
        if (this.active_menu >= this.menu_length) {
            this.active_menu = 0;
        }
        this.setFocus();
    }
    setFocusToPreviousMenuItem() {
        this.active_menu = this.active_menu -1;
        if (this.active_menu < 0) {
            this.active_menu = this.menu_length - 1;
        }
        this.setFocus();
    }
    setFocusToFirstMenuItem() {
        this.active_menu = 0;
        this.setFocus();
    }
    setFocusToLastMenuItem() {
        this.active_menu = this.menu_length - 1;
        this.setFocus();
    }
    setFocus(active_menu_item: HTMLButtonElement = undefined) {
        if (active_menu_item === undefined) {
            active_menu_item = this.menu_items[this.active_menu];
        }
        this.menu_items.forEach(el => {
            if (el === active_menu_item) {
                active_menu_item.tabIndex = 0;
                active_menu_item.focus();
            }
            else {
                el.tabIndex = -1;
            }
        })
    }
}