var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MobileMenu } from "./mobile_menu.js";
import { POPUP_List_V2 } from "./popup_list_v2.js";
import { Menubar } from "./manubar.js";
import { loadClassDetails, loadNotifications, loadAnnouncment } from "./loadData.js";
import { CardFooterMenu } from "./card_footer_menu.js";
import { TabMenu } from "./tabmenu.js";
const loadNotificationModule = () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadNotifications();
    let notification_popup = new POPUP_List_V2(document.querySelector("#notification-icon"));
});
const loadAnnouncmentModule = () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadAnnouncment();
    let announcement_popup = new POPUP_List_V2(document.querySelector("#announcement-icon"));
});
const loadCardsModule = () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadClassDetails();
    let card_footer_menus = [];
    document.querySelectorAll(".card-footer").forEach((el) => {
        let t1 = new CardFooterMenu(el);
        card_footer_menus.push(t1);
    });
});
let mobile_menu = new MobileMenu(document.querySelector("#menu-toggle-btn"));
let mmain_menu = new Menubar(document.querySelector("#nav-menu"));
let tabmenu = new TabMenu(document.querySelector("[role='tablist']"));
loadCardsModule();
loadNotificationModule();
loadAnnouncmentModule();
let notification = document.querySelector("#notification-trigger-btn");
let notification_list = document.querySelector("#notification-list");
let announcement = document.querySelector("#announcement-trigger-btn");
let announcement_list = document.querySelector("#announcements-list");
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
//# sourceMappingURL=dashboard_ts_script.js.map