let notification_badge = document.querySelector("#notification-badge");
interface fetchdataType{
    class_heading: string,
    cetegory: string,
    grad: string,
    details?: {
        number_of_unit: number,
        number_of_lession: number,
        number_of_topics: number
    } ,
    student?: number,
    is_starred?: boolean,
    img:string,
    // is_visiable: boolean,
    is_expire?: boolean,
    options: string[],
    action?:{
                disablePreview?:boolean,
        disableCourseManager?: boolean,
                disableReport?: boolean,
                disableSubmission?:boolean
    },
    course_duration?:{
                starting_date:string,
                ending_date: string
            },
               
}

function loadCourseStatus(count: number): void{
    let total = document.querySelector("#total-courses");
    let displayed_course = document.querySelector("#display-courses");
    document.querySelector(".sub-tab-item-quantity").innerHTML= count + "";
    if (count > 10) {
        displayed_course.innerHTML = 10 + "";
    }
    else {
        displayed_course.innerHTML = count + "";
    }
    total.innerHTML = count + "";
}

function loadClassDetails(): void {
    let container = document.querySelector(".card-container") as HTMLDivElement;

    fetch("/data.json")
        .then(response => response.json())
        .then((data:fetchdataType[]) => {
            console.log(data);
            loadCourseStatus(data.length);

            data.map((item) => {
                let stared_Section = item.is_starred ?
                    "<img src='assets/icons/favourite.svg' alt='added to favourite'>"
                    : `<svg id="favourite" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
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
                    console.log("Tmp");
                    console.log(tmp);
                    console.log(item.grad);
                    let tmp1 = tmp[1] !== undefined ? `<span class="text-green"> ${'+'+tmp[1]}</span>` : "";
                    grad_section = `<span class="data-seprator">${tmp[0]} ${tmp1}</span>`;
                }
                
                let load_option = `<select name="class-type" id="" class="input-div--control input-div--control_arrow" ${item.options ?"":"disabled" }>
                                ${item.options ? item.options.map((data) => `<option value="">${data}</option>`) :
                        `<option value="-1" disabled selected hidden>No Class Selected</option>`
                                }
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
                    `<div class="card-footer">
                            <button class="btn" ${item.action.disablePreview ? "disabled" : ""}>
                                <img src="assets/icons/preview.svg" alt="">
                            </button>
                            <button class="btn" ${item.action.disableCourseManager ? "disabled" : ""}>
                                <img src="assets/icons/manage course.svg" alt="">
                            </button>
                            <button class="btn" ${item.action.disableSubmission ? "disabled" : ""}>
                                <img src="assets/icons/grade submissions.svg" alt="">
                            </button>
                            <button class="btn" ${item.action.disableReport ? "disabled" : ""}>
                                <img src="assets/icons/reports.svg" alt="">
                            </button>
                        </div>`
                    :`<div class="card-footer">
                            <button class="btn" >
                                <img src="assets/icons/preview.svg" alt="">
                            </button>
                            <button class="btn">
                                <img src="assets/icons/manage course.svg" alt="">
                            </button>
                            <button class="btn">
                                <img src="assets/icons/grade submissions.svg" alt="">
                            </button>
                            <button class="btn">
                                <img src="assets/icons/reports.svg" alt="">
                            </button>
                        </div>`;
                
                container.innerHTML += `
                    <div class="card-div">
                    ${item.is_expire ? "<span class='status-lable'>Expired</span>" : ""}
                        <div class="card-body">
                            <img class="card-body--img" src="${item.img}" alt="Acceleration image">
                            <div class="card-content-detail">
                                <h2 class="card-header">
                                    <span class="card-heading">
                                        ${item.class_heading}
                                    </span>
                                    <button class="btn favourite-btn">
                                        ${stared_Section}
                                    </button>
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
                `
            })
        })
        // .catch(error => {
        //     console.log(error);
        // })
}

loadClassDetails();

let nav = document.querySelector("#nav-menu") as HTMLUListElement;
let isOpen = false;
function toggle_menu() {
    isOpen ? nav.classList.remove("display_flex") : nav.classList.add("display_flex");
    isOpen = !isOpen;
}

function updateNotificationBadge(count: number): void{
    notification_badge.innerHTML = count +"";
}
function updateAccouncementBadge(count: number): void{
    notification_badge.innerHTML = count +"";
}

let divs : NodeListOf<HTMLLIElement> = document.querySelectorAll<HTMLLIElement>(".dropdown-list-container");

divs.forEach(div => {
    div.addEventListener("click", (event) => {
        console.log(event.target);
        closeAllDropdown(divs);
        let element: HTMLLIElement;
        try {
            element = event.target as HTMLLIElement;
            toggleDropdown(element);
        } catch (error) {
            console.log("Error");
        }
      })
})

function toggleDropdown(el: HTMLLIElement) {
    let dropdown = el.querySelector(".dropdown-menu") as HTMLUListElement;
    let dropdown_icon = el.querySelector(".drop-down-arrow") as HTMLSpanElement;
    el.classList.add("background-highlight");
    dropdown.classList.add("display-block");
    dropdown_icon.style.backgroundImage = `url("/assets/screen_Assets/icons/dropdown-arrow-up.svg")`;
}

function closeAllDropdown(divs : NodeListOf<HTMLLIElement>){
    document.querySelectorAll(".dropdown-menu")
    divs.forEach(el => {
        let dropdown = el.querySelector(".dropdown-menu") as HTMLUListElement;
        let dropdown_icon = el.querySelector(".drop-down-arrow") as HTMLSpanElement;
        if (dropdown.classList.contains("display-block")) {
            // el.style.backgroundColor = "#ffffff";
            el.classList.remove("background-highlight");
            dropdown.classList.remove("display-block");
            dropdown_icon.style.backgroundImage = `url("/assets/screen_Assets/icons/dropdown-arrow-down.svg")`;
    
        }
    })
}