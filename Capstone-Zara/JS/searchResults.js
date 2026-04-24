"use strict";

let products = localStorage.getItem("products");
products = JSON.parse(products);

function displayProducts(list) {
    const container = document.getElementById('productResults');
    container.innerHTML = `<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin"></i></div>`;

    setTimeout(() => {
        container.innerHTML = "";

        list.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <p>${product.price}</p>
        `;

            card.addEventListener('click', () => {
                localStorage.setItem('selectedProduct', JSON.stringify(product));
                window.location.href = "productDetails.html";
            });

        container.appendChild(card);
        }, 500);

        
    });
}

const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase() || "";

document.getElementById('searchResultsQuery').innerHTML = 'Results for "' + query +'"';

document.getElementById('search-input').value = "";

const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query)
);

displayProducts(filtered);
console.log(filtered);