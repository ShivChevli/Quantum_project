var notification_badge = document.querySelector("#notification-badge");
function loadCourseStatus(count) {
    var total = document.querySelector("#total-courses");
    var displayed_course = document.querySelector("#display-courses");
    document.querySelector(".sub-tab-item-quantity").innerHTML = count + "";
    if (count > 10) {
        displayed_course.innerHTML = 10 + "";
    }
    else {
        displayed_course.innerHTML = count + "";
    }
    total.innerHTML = count + "";
}
function loadClassDetails() {
    var container = document.querySelector(".card-container");
    fetch("/data.json")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data);
        loadCourseStatus(data.length);
        data.map(function (item) {
            var stared_Section = item.is_starred ?
                "<img src='assets/icons/favourite.svg' alt='added to favourite'>"
                : "<svg id=\"favourite\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n                            viewBox=\"0 0 24 24\">\n                            <path id=\"Path_3678\" data-name=\"Path 3678\" d=\"M0,0H24V24H0Z\" fill=\"none\" />\n                            <path id=\"Path_3679\" data-name=\"Path 3679\"\n                                d=\"M12,17.27,18.18,21l-1.64-7.03L22,9.24l-7.19-.61L12,2,9.19,8.63,2,9.24l5.46,4.73L5.82,21Z\"\n                                fill=\"#213E543D\" />\n                            <path id=\"Path_3680\" data-name=\"Path 3680\" d=\"M0,0H24V24H0Z\" fill=\"none\" />\n                        </svg>";
            var grad_section = "";
            if (item.grad) {
                var tmp = item.grad.split("+");
                console.log("Tmp");
                console.log(tmp);
                console.log(item.grad);
                var tmp1 = tmp[1] !== undefined ? "<span class=\"text-green\"> ".concat('+' + tmp[1], "</span>") : "";
                grad_section = "<span class=\"data-seprator\">".concat(tmp[0], " ").concat(tmp1, "</span>");
            }
            var load_option = "<select name=\"class-type\" id=\"\" class=\"input-div--control input-div--control_arrow\" ".concat(item.options ? "" : "disabled", ">\n                                ").concat(item.options ? item.options.map(function (data) { return "<option value=\"\">".concat(data, "</option>"); }) :
                "<option value=\"-1\" disabled selected hidden>No Class Selected</option>", "\n                            </select>");
            var detail_section = item.details ?
                "<p class=\"class-detail\">\n                        <span>".concat(item.details.number_of_unit, "</span> Units\n                        <span>").concat(item.details.number_of_lession, "</span> Lessions\n                        <span>").concat(item.details.number_of_topics, "</span> Topics\n                    </p>")
                : "";
            var enrolled_student = item.student ?
                "<span>".concat(item.student, " Students </span>")
                : "";
            var course_duration = item.course_duration ?
                "<span class=\"data-seprator\">".concat(item.course_duration.starting_date, " - ").concat(item.course_duration.ending_date, "</span>")
                : "";
            var action_Section = item.action ?
                "<div class=\"card-footer\">\n                            <button class=\"btn\" ".concat(item.action.disablePreview ? "disabled" : "", ">\n                                <img src=\"assets/icons/preview.svg\" alt=\"\">\n                            </button>\n                            <button class=\"btn\" ").concat(item.action.disableCourseManager ? "disabled" : "", ">\n                                <img src=\"assets/icons/manage course.svg\" alt=\"\">\n                            </button>\n                            <button class=\"btn\" ").concat(item.action.disableSubmission ? "disabled" : "", ">\n                                <img src=\"assets/icons/grade submissions.svg\" alt=\"\">\n                            </button>\n                            <button class=\"btn\" ").concat(item.action.disableReport ? "disabled" : "", ">\n                                <img src=\"assets/icons/reports.svg\" alt=\"\">\n                            </button>\n                        </div>")
                : "<div class=\"card-footer\">\n                            <button class=\"btn\" >\n                                <img src=\"assets/icons/preview.svg\" alt=\"\">\n                            </button>\n                            <button class=\"btn\">\n                                <img src=\"assets/icons/manage course.svg\" alt=\"\">\n                            </button>\n                            <button class=\"btn\">\n                                <img src=\"assets/icons/grade submissions.svg\" alt=\"\">\n                            </button>\n                            <button class=\"btn\">\n                                <img src=\"assets/icons/reports.svg\" alt=\"\">\n                            </button>\n                        </div>";
            container.innerHTML += "\n                    <div class=\"card-div\">\n                    ".concat(item.is_expire ? "<span class='status-lable'>Expired</span>" : "", "\n                        <div class=\"card-body\">\n                            <img class=\"card-body--img\" src=\"").concat(item.img, "\" alt=\"Acceleration image\">\n                            <div class=\"card-content-detail\">\n                                <h2 class=\"card-header\">\n                                    <span class=\"card-heading\">\n                                        ").concat(item.class_heading, "\n                                    </span>\n                                    <button class=\"btn favourite-btn\">\n                                        ").concat(stared_Section, "\n                                    </button>\n                                </h2>\n                                <p class=\"class-topic-detail\">\n                                    <span>").concat(item.cetegory, "</span>\n                                    ").concat(grad_section, "\n                                </p>\n                                ").concat(detail_section, "\n                                ").concat(load_option, "\n                                <p>\n                                    ").concat(enrolled_student, "\n                                    ").concat(course_duration, "\n                                </p>\n                            </div>\n                        </div>\n                        ").concat(action_Section, "\n                    </div>\n                ");
        });
    });
    // .catch(error => {
    //     console.log(error);
    // })
}
loadClassDetails();
var nav = document.querySelector("#nav-menu");
var isOpen = false;
function toggle_menu() {
    isOpen ? nav.classList.remove("display_flex") : nav.classList.add("display_flex");
    isOpen = !isOpen;
}
function updateNotificationBadge(count) {
    notification_badge.innerHTML = count + "";
}
function updateAccouncementBadge(count) {
    notification_badge.innerHTML = count + "";
}
var divs = document.querySelectorAll(".dropdown-list-container");
divs.forEach(function (div) {
    div.addEventListener("click", function (event) {
        console.log(event.target);
        closeAllDropdown(divs);
        var element;
        try {
            element = event.target;
            toggleDropdown(element);
        }
        catch (error) {
            console.log("Error");
        }
    });
});
function toggleDropdown(el) {
    var dropdown = el.querySelector(".dropdown-menu");
    var dropdown_icon = el.querySelector(".drop-down-arrow");
    el.classList.add("background-highlight");
    dropdown.classList.add("display-block");
    dropdown_icon.style.backgroundImage = "url(\"/assets/screen_Assets/icons/dropdown-arrow-up.svg\")";
}
function closeAllDropdown(divs) {
    document.querySelectorAll(".dropdown-menu");
    divs.forEach(function (el) {
        var dropdown = el.querySelector(".dropdown-menu");
        var dropdown_icon = el.querySelector(".drop-down-arrow");
        if (dropdown.classList.contains("display-block")) {
            // el.style.backgroundColor = "#ffffff";
            el.classList.remove("background-highlight");
            dropdown.classList.remove("display-block");
            dropdown_icon.style.backgroundImage = "url(\"/assets/screen_Assets/icons/dropdown-arrow-down.svg\")";
        }
    });
}
//# sourceMappingURL=dashboard_ts_script.js.map