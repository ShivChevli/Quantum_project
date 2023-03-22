var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loadClassDetails, loadNotifications, loadAnnouncment } from "./loadData.js";
import { Menubar } from "./manubar.js";
import { MobileMenu } from "./mobile_menu.js";
import { POPUP_List_V2 } from "./popup_list_v2.js";
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
    document.querySelectorAll(".card-div .favourite-btn").forEach((el) => {
        el.addEventListener("click", (event) => {
            el.classList.toggle("checked");
            el.ariaChecked = el.ariaChecked === "true" ? "false" : "true";
        });
        el.addEventListener("keydown", (event) => {
            let key = event.key;
            if (key === " " || key === "Enter") {
                el.classList.toggle("checked");
                el.ariaChecked = el.ariaChecked === "true" ? "false" : "true";
                event.preventDefault();
                event.stopPropagation();
            }
        });
    });
});
let mobile_menu = new MobileMenu(document.querySelector("#menu-toggle-btn"));
let mmain_menu = new Menubar(document.querySelector("#nav-menu"));
let tabmenu = new TabMenu(document.querySelector("[role='tablist']"));
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
//# sourceMappingURL=dashboard_ts_script.js.map