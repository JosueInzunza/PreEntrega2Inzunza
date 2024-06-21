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

//Carrito de compra
let iconCart = document.querySelector('.cart');
let closeCart = document.querySelector('.close')
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.product-container');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.cart span')

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
    BODY.classList.toggle('showCart')
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <div class="${product.class}" data-name="disney1">
                    <img src="${product.image}" alt="">
                    <h2>${product.name}</h2>
                    <h3>${product.collection}</h3>
                    <div class="price">$${product.price}</div>
                    <button class="addCart">Add to cart</button>
                </div>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts= [{
            product_id: product_id,
            quantity: 1 
        }]
    } else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () =>{
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct + 2];
            newCart.innerHTML = `
            <div class="image">
                        <img src="${info.image}" alt="">
                    </div>
                    <div class="nameCart">
                    ${info.name}
                    </div>
                    <div class="totalPrice">
                    $${info.price * cart.quantity}
                    </div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">></span>
                    </div>
            `;
        listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        switch (type) {
            case 'plus' :
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;

            default: 
                let valueChange = carts[positionItemInCart].quantity - 1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                } else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

const init = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}



init();