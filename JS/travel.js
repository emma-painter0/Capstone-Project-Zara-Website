"use strict";

const travelProducts = [
    {
        name: "Polyester Travel Bag",
        image: "images/travelbag.jpg",
        price: 60.00,
        category: "bag",
    },
    {
        name: "Canvas Travel Bag",
        image: "images/graytravelbag.jpg",
        price: 100.00,
        category: "bag",
    },
    {
        name: "Duffel Bag",
        image: "images/duffelbag.jpg",
        price: 50.00,
        category: "bag",
    },
    {
        name: "Bifold Wallet",
        image: "images/bifoldwallet.jpeg",
        price: 30.00,
        category: "wallet",
    },
    {
        name: "Zip Wallet",
        image: "images/zipwallet.jpeg",
        price: 25.00,
        category: "wallet",
    }
];

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

        // click → go to product page
        card.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = "productDetails.html";
        });

        container.appendChild(card);
    });
}, 500);
}

// show all initially
displayProducts(travelProducts);

// Filter by Category 
document.getElementById('filter').addEventListener('change', (e) => {
    const value = e.target.value;

    if (value === "all") {
        displayProducts(travelProducts);
    } else {
        const filtered = travelProducts.filter(product => 
            product.category === value
        );
        displayProducts(filtered);
    }
});
