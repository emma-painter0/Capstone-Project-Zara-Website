"use strict";

// Get product from localStorage
const product = JSON.parse(localStorage.getItem('selectedProduct'));

const qtyEl = document.getElementById("quantity");
const decreaseBtn = document.getElementById("decreaseQty");
const increaseBtn = document.getElementById("increaseQty");

let quantity = 1;

if (product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-description').textContent = product.description;

    document.getElementById('add-to-cart').addEventListener('click', () => {

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${product.name} added to cart!`);
    });
} else {
    console.log("No product found!");
}

increaseBtn.addEventListener("click", () => {
    quantity++;
    qtyEl.textContent = quantity;
});

decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        qtyEl.textContent = quantity;
    }
});