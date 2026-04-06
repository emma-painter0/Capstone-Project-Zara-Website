"use strict";

document.querySelector("#hamburgerMenu").addEventListener("click", event => { document.querySelector(".navmenu").classList.toggle("hidden") });

document.querySelector("#womenNavBtn").addEventListener("click", event => window.location.href = "women.html");

document.querySelector("#menNavBtn").addEventListener("click", event => window.location.href = "mens.html");

document.querySelector("#kidNavBtn").addEventListener("click", event => window.location.href = "kids.html");

document.querySelector("#beautyNavBtn").addEventListener("click", event => window.location.href = "beautySection.html");

document.querySelector("#travelNavBtn").addEventListener("click", event => window.location.href = "travel.html");

document.querySelector("#homeDecorNavBtn").addEventListener("click", event => window.location.href = "homeDecor.html");


// Get product from localStorage
const product = JSON.parse(localStorage.getItem('selectedProduct'));

// Display product info
if (product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-description').textContent = product.description;
}

// Add to cart functionality
document.getElementById('add-to-cart').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
});

