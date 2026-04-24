"use strict";

let themePreference = sessionStorage.getItem("themePreference");

window.addEventListener("DOMContentLoaded", () => {
    if (themePreference == "dark") document.body.classList.add("dark");
});

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

const themeToggle = document.getElementById("darkModeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        sessionStorage.setItem("themePreference", "dark");
        themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }
    else {
        sessionStorage.removeItem("themePreference");
        themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
});