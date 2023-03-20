let btn_menu = document.querySelector("#show-pwd-btn") as HTMLButtonElement;
let input = document.querySelector("#pwd-input") as HTMLInputElement;
let isShow = true;
    
btn_menu.addEventListener("click", (event) => {
    input.setAttribute("type", isShow ? "input" : "password");
    isShow = !isShow;
});

let t1 = document.querySelector(".select-btn-group").querySelectorAll("[type='radio']");
t1.forEach((el:HTMLInputElement) => {
    el.addEventListener("focusin", (event) => {
        el.parentElement.classList.add("focus");
    })
    el.addEventListener("focusout",(event) => {
        el.parentElement.classList.remove("focus");
    })
})