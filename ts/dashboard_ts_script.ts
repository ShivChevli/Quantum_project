import { loadClassDetails ,loadNotifications, loadAnnouncment } from "./loadData.js";
import { Menubar } from "./manubar.js";
import { MobileMenu } from "./mobile_menu.js";
import { POPUP_List_V2 } from "./popup_list_v2.js";
import { CardFooterMenu } from "./card_footer_menu.js";
import { TabMenu } from "./tabmenu.js";


const loadNotificationModule = async () => {
    await loadNotifications();
    let notification_popup: POPUP_List_V2 =
        new POPUP_List_V2(document.querySelector("#notification-icon"));
} 

const loadAnnouncmentModule = async () => {
    await loadAnnouncment();
    let announcement_popup: POPUP_List_V2 = new  POPUP_List_V2(document.querySelector("#announcement-icon"));
}
const loadCardsModule = async () => {
    await loadClassDetails();
    let card_footer_menus: Array<CardFooterMenu> = [];
    document.querySelectorAll(".card-footer").forEach((el:HTMLDivElement) => {
        let t1: CardFooterMenu = new CardFooterMenu(el);
        card_footer_menus.push(t1);
    })
    document.querySelectorAll(".card-div .favourite-btn").forEach((el:HTMLSpanElement) => {
        el.addEventListener("click", (event) => {
            el.classList.toggle("checked");
            el.ariaChecked = el.ariaChecked === "true" ? "false" : "true"; 
        })
        el.addEventListener("keydown", (event) => {
            let key = event.key;
            if (key === " " || key === "Enter") {
                el.classList.toggle("checked");
                el.ariaChecked = el.ariaChecked === "true" ? "false" : "true";
                event.preventDefault();
                event.stopPropagation();
            }
        })
    })
}
let mobile_menu: MobileMenu = new MobileMenu(document.querySelector("#menu-toggle-btn"));
let mmain_menu: Menubar = new Menubar(document.querySelector("#nav-menu"));
let tabmenu: TabMenu = new TabMenu(document.querySelector("[role='tablist']"));

loadCardsModule();
loadNotificationModule();
loadAnnouncmentModule();

// #######################################################################
// ########################### Version 1 #################################
// #######################################################################

// let notification_popup:POPUP_List = new POPUP_List(notification, notification_list);
// notification_popup.init();

// let announcement_popup: POPUP_List = new POPUP_List(announcement, announcement_list);
// announcement_popup.init();

// #######################################################################
// ########################### Version 2 #################################
// #######################################################################

// let notification_popup:POPUP_List_V2 = new POPUP_List_V2(document.querySelector("#notification-icon"));
// let announcement_popup: POPUP_List_V2 = new  POPUP_List_V2(document.querySelector("#announcement-icon"));
