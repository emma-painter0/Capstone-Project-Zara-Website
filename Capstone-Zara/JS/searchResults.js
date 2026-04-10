"use strict";


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
        }, 500);

        container.appendChild(card);
    });
}

const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase() || "";

document.getElementById('search-input').value = query;

const filtered = womensProducts.filter(p =>
    p.name.toLowerCase().includes(query)
);

displayProducts(filtered);
console.log(filtered);