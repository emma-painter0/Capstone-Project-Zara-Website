"use strict";

// load products from products.json
async function loadProducts() {
    try {
        const response = await fetch("./JS/products.json");
        let products = await response.json();

        // add products to local
        localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("DOMContentLoaded", loadProducts);

document.querySelector("#hamburgerMenu").addEventListener("click", event => { document.querySelector(".navmenu").classList.toggle("hidden") });


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
    addToCartBtn.addEventListener("click", () => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: Number(product.price),
                quantity: quantity
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // reset quantity after adding
        quantity = 1;
        qtyEl.textContent = quantity;
    });
}

document.addEventListener('DOMContentLoaded', () => {

    let products = localStorage.getItem('products');
    products = JSON.parse(products);

    const searchInput = document.getElementById('search-input');
    const suggestionsBox = document.getElementById('suggestions');

    if (!searchInput || !suggestionsBox) return;

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();

        suggestionsBox.innerHTML = `<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin"></i></div>`;

        setTimeout(() => {
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

        }, 500);


    });

});

