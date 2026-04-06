"use strict";

// Get product from localStorage
const product = JSON.parse(localStorage.getItem('selectedProduct'));

// Only run if we have a product
if (product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-description').textContent = product.description;

    document.getElementById('add-to-cart').addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    });
} else {
    console.log("No product found!");
}