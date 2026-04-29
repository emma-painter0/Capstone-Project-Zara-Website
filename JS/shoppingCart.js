'use strict'

const cartItemsContainer = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const checkoutBtn = document.getElementById("checkout-btn");

// Get cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render cart
function renderCart() {
    cartItemsContainer.innerHTML = "";

    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        subtotalEl.textContent = "$0.00";
        totalEl.textContent = "$0.00";
        return;
    }

    cart.forEach((item, index) => {

        const price = Number(item.price);
        const quantity = item.quantity || 1;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <div class="cart-item-container">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">

                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <div class="qty-controls">
                        <button class="decrease" data-index="${index}">−</button>
                        <span>${quantity}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>

                    <p><strong>$${(price * quantity).toFixed(2)}</strong></p>
                    <p><strong>Total: $${(price * quantity).toFixed(2)}</strong></p>

                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            </div>
        `;

        console.log("CART ITEM:", item);
        console.log("PRICE TYPE:", typeof item.price, item.price);
        cartItemsContainer.appendChild(itemDiv);

        subtotal += price * quantity;
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalEl.textContent = `$${subtotal.toFixed(2)}`;
}

cartItemsContainer.addEventListener("click", (e) => {

    const index = e.target.dataset.index;

    if (index === undefined) return;

    if (e.target.classList.contains("increase")) {
        cart[index].quantity += 1;
    }

    if (e.target.classList.contains("decrease")) {
        cart[index].quantity -= 1;

        // remove item if quantity hits 0
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
});

// Remove item
cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const index = e.target.dataset.index;

        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart();
    }
});

// Checkout button
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        window.location.href = "shippingDetails.html";
    });
}

// Load cart
renderCart();