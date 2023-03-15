let notification_list = document.querySelector("#notification-list");
let ul = notification_list.querySelector("ul");
let notificatoin_badge = document.querySelector("#notificatoin-badge");
export const loadNotifications = () => {
    fetch("/data/notifications.json")
        .then(res => res.json())
        .then(data => {
        // let ul = document.createElement("ul");
        // ul.classList.add("alert-list");
        // ul.role = "menu";
        // ul.ariaLabel = "Notification List";
        // console.log(data)
        data.map(el => {
            let li = `
                    <li class="alert-list-item ${el.isSeen ? 'bg-offWhite' : ''}" role="menuitem" aria-atomic="true" >
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
                    </li>
                `;
            // console.log(li);
            ul.innerHTML += li;
        });
        // notification_list.appendChild(ul);
    });
};
//# sourceMappingURL=loadData.js.map