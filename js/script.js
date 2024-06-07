const BODY = document.querySelector("body");
const NAV = document.querySelector("nav");
const MODETOGGLE = document.querySelector(".dark-light");
const SEARCHTOGGLE = document.querySelector(".searchToggle");
const SIDERBAROPEN = document.querySelector(".sidebarOpen");
const SIDERBARCLOSE = document.querySelector(".siderbarClose");

let getMode = localStorage.getItem("mode");
    if(getMode && getMode === "dark-mode"){
        BODY.classList.add("dark")
    }

//dark-light mode toggle
MODETOGGLE.addEventListener("click", () =>{
    MODETOGGLE.classList.toggle("active");
    BODY.classList.toggle("dark")

    if(!BODY.classList.contains("dark")){
        localStorage.setItem("mode", "light-mode");
    } else{
        localStorage.setItem("mode", "dark-mode")
    }
});

//search toggle
SEARCHTOGGLE.addEventListener("click", () =>{
    SEARCHTOGGLE.classList.toggle("active");
});

//sidebar toggle
SIDERBAROPEN.addEventListener("click", () =>{
    NAV.classList.add("active");
})

BODY.addEventListener("click", e =>{
    let clickedElm = e.target;

    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        NAV.classList.remove("active")
    }
})

//cards
let previewContainer = document.querySelector('.product-preview');
let previewBox = previewContainer.querySelectorAll('.preview');

document.querySelectorAll('.product-container .product').forEach(product =>{
    product.onclick = () =>{
        previewContainer.style.display = 'flex';
        let name = product.getAttribute('data-name');
        previewBox.forEach(preview =>{
            let target = preview.getAttribute('data-target');
            if(name == target){
                preview.classList.add('active');
            }
        });
    };
});

previewBox.forEach(close =>{
    close.querySelector('.previewClose').onclick = () =>{
        close.classList.remove('active');
        previewContainer.style.display = 'none' 
    }
});

//filters
const ALLFILTERITEMS = document.querySelectorAll('.product');
const ALLFILTERBTNS = document.querySelectorAll('.filter-btn');

window.addEventListener('DOMContentLoaded', () => {
    ALLFILTERBTNS[0].classList.add('active-btn');
});

ALLFILTERBTNS.forEach((btn) => {
        btn.addEventListener('click', () => {
            showFilteredConent(btn);
        });
});

function showFilteredConent(btn){
    ALLFILTERITEMS.forEach((item) => {
        if(item.classList.contains(btn.id)){
            btn.classList.add('active-btn');
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })
}

function resetActiveBtn(){
    ALLFILTERBTNS.forEach((btn) =>{
        btn.classList.remove('active btn');
    });
}