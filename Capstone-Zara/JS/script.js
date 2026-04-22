"use strict";

// load products from products.json
async function loadProducts() {
    try {
        const response = await fetch("./JS/products.json");
        let products = await response.json();


        // add products to local
        localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
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

window.addEventListener("DOMContentLoaded", (event) => {
    if (event.target.location.href.includes("contact.html")) {
        const main = document.querySelector(".contact-container");
        const container = document.querySelector("main > div");

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const msgInput = document.getElementById("message");

        document.querySelector("button").addEventListener("click", () => {
            if (nameInput.classList.contains("valid") && emailInput.classList.contains("valid") && msgInput.classList.contains("valid")) {
                main.removeChild(container);
                const spinner = document.createElement("div");
                spinner.classList.add("loading-spinner");
                spinner.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
                main.appendChild(spinner);

                const confirmation = document.createElement("div");
                confirmation.classList.add("submission-confirmation");

                let icon = document.createElement("div");
                icon.innerHTML = `<i class="fa-regular fa-circle-check"></i>`;

                confirmation.appendChild(icon);

                let successMessageContainer = document.createElement("div");
                let header1 = document.createElement("h1");
                header1.innerHTML = "<h1>Success!</h1>";
                successMessageContainer.appendChild(header1);

                let message = document.createElement("p");
                message.innerHTML = "<p>Thank you for your feedback!</p>";
                successMessageContainer.appendChild(message);

                confirmation.appendChild(successMessageContainer);


                setTimeout(() => {
                    main.removeChild(spinner);

                    main.appendChild(confirmation);

                }, 500);
            }

        });
    }
});