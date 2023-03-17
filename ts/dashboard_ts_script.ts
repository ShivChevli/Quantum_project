import { POPUP_List } from "./popup_list.js";
import { MobileMenu } from "./mobile_menu.js";
import { POPUP_List_V2 } from "./popup_list_v2.js";
import { Menubar } from "./manubar.js";
import { loadClassDetails ,loadNotifications, loadAnnouncment } from "./loadData.js";
import { CardFooterMenu } from "./card_footer_menu.js";
import { TabMenu } from "./tabmenu.js";


const loadNotificationModule = async () => {
    await loadNotifications();
    let notification_popup:POPUP_List_V2 = new POPUP_List_V2(document.querySelector("#notification-icon"));
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
}
let mobile_menu: MobileMenu = new MobileMenu(document.querySelector("#menu-toggle-btn"));
let mmain_menu: Menubar = new Menubar(document.querySelector("#nav-menu"));
let tabmenu: TabMenu = new TabMenu(document.querySelector("[role='tablist']"));

loadCardsModule();
loadNotificationModule();
loadAnnouncmentModule();

let notification: HTMLSpanElement = document.querySelector("#notification-trigger-btn");
let notification_list: HTMLDivElement = document.querySelector("#notification-list");
let announcement: HTMLSpanElement = document.querySelector("#announcement-trigger-btn");
let announcement_list: HTMLDivElement = document.querySelector("#announcements-list");

// notification.addEventListener("click", () => {
//     notification.setAttribute("aria-expanded", "true");
//     notification_list.classList.add("show-list");
//     console.log(notification.parentElement);
// });
// notification.parentElement.addEventListener("focusout", event => {
//     notification.setAttribute("aria-expanded", "false");
//     notification_list.classList.remove("show-list");
// })

// announcement.addEventListener("click", () => {
//     announcement.setAttribute("aria-expanded", "true");
//     announcement_list.classList.add("show-list");
//     console.log(announcement.parentElement);
// });
// announcement.parentElement.addEventListener("focusout", event => {
//     announcement.setAttribute("aria-expanded", "false");
//     announcement_list.classList.remove("show-list");
// })

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

