"use strict";

// load products from products.json
async function loadProducts() {
    try {
        const response = await fetch("./JS/products.json");
        let products = await response.json();
        
        // add products to local
        localStorage.setItem('products', JSON.stringify(products));
    } catch(error) {
        console.log(error);
    }
}

window.addEventListener("DOMContentLoaded", loadProducts);

document.querySelector("#hamburgerMenu").addEventListener("click", event => { document.querySelector(".navmenu").classList.toggle("hidden") });

window.addEventListener("DOMContentLoaded", (event) => {

    if (event.target.location.href.includes("index.html")) {
        document.querySelector("#womenNavBtn").addEventListener("click", () => window.location.href = "women.html");
        document.querySelector("#menNavBtn").addEventListener("click", () => window.location.href = "mens.html");
        document.querySelector("#kidNavBtn").addEventListener("click", () => window.location.href = "kids.html");
        document.querySelector("#beautyNavBtn").addEventListener("click", () => window.location.href = "beautySection.html");
        document.querySelector("#travelNavBtn").addEventListener("click", () => window.location.href = "travel.html");
        document.querySelector("#homeDecorNavBtn").addEventListener("click", () => window.location.href = "homeDecor.html");

    }
});


// Get product from localStorage
const product = JSON.parse(localStorage.getItem('selectedProduct'));

// Display product info
if (product) {

    const img = document.getElementById('product-image');
    const name = document.getElementById('product-name');
    const price = document.getElementById('product-price');
    const desc = document.getElementById('product-description');

    if (img) img.src = product.image;
    if (name) name.textContent = product.name;
    if (price) price.textContent = product.price;
    if (desc) desc.textContent = product.description;

}

// Add to cart functionality
const addToCartBtn = document.getElementById('add-to-cart');

if (addToCartBtn && product) {
    addToCartBtn.addEventListener('click', () => {

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.name === product.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: product.name,
                image: product.image,
                price: Number(product.price),
                quantity: 1
            });
        }
        console.log("ADDING PRODUCT:", product);

        localStorage.setItem('cart', JSON.stringify(cart));
    });
}

document.addEventListener('DOMContentLoaded', () => {

    let products = localStorage.getItem('products');
    console.log(products);
    products = JSON.parse(products);

    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('suggestions');

    if (!searchInput || !suggestionsBox) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();

        suggestionsBox.innerHTML = "";

        if (query === "") return;

        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            suggestionsBox.innerHTML = `<div class="suggestion-item">No results found</div>`;
            return;
        }

        filtered.slice(0, 5).forEach(product => {
            const div = document.createElement('div');
            div.classList.add('suggestion-item');
            div.textContent = product.name;

            div.addEventListener('click', () => {
                window.location.href = `searchResult.html?q=${product.name}`;
            });

            suggestionsBox.appendChild(div);
        });
    });

});