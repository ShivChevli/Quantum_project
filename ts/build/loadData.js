var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let notification_list = document.querySelector("#notification-list");
let notificatoin_badge = document.querySelector("#notificatoin-badge");
let announcements_list = document.querySelector("#announcements-list");
let announcements_badge = document.querySelector("#announcements-badge");
function loadCourseStatus(count) {
    let total = document.querySelector("#total-courses");
    let displayed_course = document.querySelector("#display-courses");
    document.querySelector(".sub-tab-item-quantity").innerHTML = count + "";
    if (count > 10) {
        displayed_course.innerHTML = 10 + "";
    }
    else {
        displayed_course.innerHTML = count + "";
    }
    total.innerHTML = count + "";
}
export const loadClassDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    let container = document.querySelector(".card-container");
    let data = yield getData("/data/card_data.json");
    // console.log(data);
    loadCourseStatus(data.length);
    data.map((item) => {
        let stared_Section = item.is_starred ?
            `<img src='assets/icons/favourite.svg' tabindex="0" role="checkbox" aria-checked="true" alt='added to favourite'>`
            : `<svg id="favourite" xmlns="http://www.w3.org/2000/svg" tabindex="0" role="checkbox" aria-checked="false" width="24" height="24"
                    viewBox="0 0 24 24">
                    <path id="Path_3678" data-name="Path 3678" d="M0,0H24V24H0Z" fill="none" />
                    <path id="Path_3679" data-name="Path 3679"
                        d="M12,17.27,18.18,21l-1.64-7.03L22,9.24l-7.19-.61L12,2,9.19,8.63,2,9.24l5.46,4.73L5.82,21Z"
                        fill="#213E543D" />
                    <path id="Path_3680" data-name="Path 3680" d="M0,0H24V24H0Z" fill="none" />
                </svg>`;
        let grad_section = "";
        if (item.grad) {
            let tmp = item.grad.split("+");
            // console.log("Tmp");
            // console.log(tmp);
            // console.log(item.grad);
            let tmp1 = tmp[1] !== undefined ? `<span class="text-green"> ${'+' + tmp[1]}</span>` : "";
            grad_section = `<span class="data-seprator">${tmp[0]} ${tmp1}</span>`;
        }
        let load_option = `<select name="class-type" id="" aria-label="select classes" class="input-div--control input-div--control_arrow" ${item.options ? "" : "disabled"}>
                        ${item.options ? item.options.map((data) => `<option value="">${data}</option>`) :
            `<option value="-1" selected >No Class Selected</option>`}
                    </select>`;
        let detail_section = item.details ?
            `<p class="class-detail">
                <span>${item.details.number_of_unit}</span> Units
                <span>${item.details.number_of_lession}</span> Lessions
                <span>${item.details.number_of_topics}</span> Topics
            </p>`
            : "";
        let enrolled_student = item.student ?
            `<span>${item.student} Students </span>`
            : "";
        let course_duration = item.course_duration ?
            `<span class="data-seprator">${item.course_duration.starting_date} - ${item.course_duration.ending_date}</span>`
            : "";
        let action_Section = item.action ?
            `<div class="card-footer"  role="menubar" aria-label="${item.class_heading} class tools">
                    <button class="btn ${item.action.disablePreview ? "disabled" : ""}"  aria-disabled="${item.action.disablePreview ? "true" : "false"}" role="menuitem" tabindex="0" aria-label="Show Preview for ${item.class_heading}" >
                        <img src="assets/icons/preview.svg" alt="">
                    </button>
                    <button class="btn ${item.action.disableCourseManager ? "disabled" : ""}" aria-disabled="${item.action.disableCourseManager ? "true" : "false"}" role="menuitem" aria-label="Manage Courses for ${item.class_heading}">
                        <img src="assets/icons/manage course.svg" alt="">
                    </button>
                    <button class="btn ${item.action.disableSubmission ? "disabled" : ""}" aria-disabled="${item.action.disableSubmission ? "true" : "false"}" role="menuitem" aria-label="Grad Submission for ${item.class_heading}">
                        <img src="assets/icons/grade submissions.svg" alt="">
                    </button>
                    <button class="btn ${item.action.disableReport ? "disabled" : ""}" aria-disabled="${item.action.disableReport ? "true" : "false"}"  role="menuitem" aria-label="Get Report for ${item.class_heading}">
                        <img src="assets/icons/reports.svg" alt="">
                    </butt>
                </div>`
            : `<div class="card-footer" role="menubar" aria-label="${item.class_heading} class tools">
                    <button class="btn" aria-label="Preview for ${item.class_heading}" role="menuitem" tabindex="0">
                        <img src="assets/icons/preview.svg" alt="">
                    </button>
                    <button class="btn" aria-label="Manage Courses for ${item.class_heading}" role="menuitem">
                        <img src="assets/icons/manage course.svg" alt="">
                    </button>
                    <button class="btn" aria-label="Grad Submission for ${item.class_heading}" role="menuitem">
                        <img src="assets/icons/grade submissions.svg" alt="">
                    </button>
                    <button class="btn" aria-label="get Report for ${item.class_heading}" role="menuitem">
                        <img src="assets/icons/reports.svg" alt="">
                    </button>
                </div>`;
        // let action_Section = item.action ?
        //     `<div class="card-footer"  aria-label="Card footer">
        //             <button class="btn" aria-label="show Preview for ${item.class_heading}" ${item.action.disablePreview ? "disabled" : ""} >
        //                 <img src="assets/icons/preview.svg" alt="">
        //             </button>
        //             <button class="btn" aria-label="Manage Courses for ${item.class_heading}" ${item.action.disableCourseManager ? "disabled" : ""}>
        //                 <img src="assets/icons/manage course.svg" alt="">
        //             </button>
        //             <button class="btn" aria-label="Grad Submission for ${item.class_heading}" ${item.action.disableSubmission ? "disabled" : ""}>
        //                 <img src="assets/icons/grade submissions.svg" alt="">
        //             </button>
        //             <button class="btn" aria-label="get Report for ${item.class_heading}" ${item.action.disableReport ? "disabled" : ""}>
        //                 <img src="assets/icons/reports.svg" alt="">
        //             </button>
        //         </div>`
        //     :`<div class="card-footer" role="menu" aria-label="Card footer">
        //             <button class="btn" aria-label="show Preview for ${item.class_heading}">
        //                 <img src="assets/icons/preview.svg" alt="">
        //             </button>
        //             <button class="btn" aria-label="Manage Courses for ${item.class_heading}" >
        //                 <img src="assets/icons/manage course.svg" alt="">
        //             </button>
        //             <button class="btn" aria-label="Grad Submission for ${item.class_heading}" >
        //                 <img src="assets/icons/grade submissions.svg" alt="">
        //             </button>
        //             <button class="btn" aria-label="get Report for ${item.class_heading}" >
        //                 <img src="assets/icons/reports.svg" alt="">
        //             </button>
        //         </div>`;
        container.innerHTML += `
            <div class="card-div">
            ${item.is_expire ? "<span class='status-lable'>Expired</span>" : ""}
                <div class="card-body">
                    <img class="card-body--img" src="${item.img}" alt="">
                    <div class="card-content-detail">
                        <h2 class="card-header">
                            <span class="card-heading">
                                ${item.class_heading}
                            </span>
                            <span class="btn favourite-btn">
                                ${stared_Section}
                            </span>
                        </h2>
                        <p class="class-topic-detail">
                            <span>${item.cetegory}</span>
                            ${grad_section}
                        </p>
                        ${detail_section}
                        ${load_option}
                        <p>
                            ${enrolled_student}
                            ${course_duration}
                        </p>
                    </div>
                </div>
                ${action_Section}
            </div>
        `;
    });
});
export const loadNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    let ul = notification_list.querySelector("ul");
    let data = yield getData("/data/notifications.json");
    console.log(data);
    data.map(el => {
        let li = document.createElement("li");
        li.classList.add("alert-list-item");
        if (el.isSeen) {
            li.classList.add("bg-offWhite");
        }
        li.role = "menuitem";
        li.innerHTML = `
            <div class="list-content ">
                <p>
                    ${el.content}
                </p>
                ${el.isSeen ?
            `<img src="assets/screen_Assets/icons/remove.svg" class="remove-icom action-img" alt="Remove Item">` :
            `<img src="assets/screen_Assets/icons/check.svg" class="remove-icom action-img" alt="Checked Item">`}
            </div>
            ${el.course ? `<p class="course-lable">Course: <span>${el.course}</span></p>` : ""}
            <p class="list-footer">
                <span class="time">${el.timestamp}</span>
            </p>
        `;
        ul.appendChild(li);
    });
    console.log(ul);
});
export const loadAnnouncment = () => __awaiter(void 0, void 0, void 0, function* () {
    let ul = announcements_list.querySelector("ul");
    let data = yield getData("/data/announcement.json");
    console.log("Announcement List load");
    data.map(element => {
        let li = document.createElement("li");
        li.classList.add("alert-list-item");
        if (element.isSeen) {
            li.classList.add("bg-offWhite");
        }
        li.role = "menuitem";
        li.innerHTML = `
            <p class="list-top">
                <span class="label">PA:</span>
                <span>${element.userName}</span>
                ${element.isSeen ?
            `<img src="assets/screen_Assets/icons/remove.svg" class="remove-icom action-img" alt="Remove Item">` :
            `<img src="assets/screen_Assets/icons/check.svg" class="remove-icom action-img" alt="Checked Item">`}
            </p>
            <div class="list-content">
                <p>${element.content}</p>
            </div>
            <p class="list-footer">
            ${element.course ?
            `<span class="course-lable">Course: ${element.course}</span>` : ""}
            ${element.filesAttached ? `
                <span class="file-attach">
                    <img src="assets/screen_Assets/icons/clip.svg" alt="attachement">
                    ${element.filesAttached} files are attached
                </span>
                ` : ""}
                <span class="time">${element.timestamp}</span>
            </p>
    `;
        ul.appendChild(li);
    });
});
const getData = (path) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield fetch(path);
    if (res.status !== 200) {
        return [];
    }
    let data = yield res.json();
    return data;
});
//# sourceMappingURL=loadData.js.map