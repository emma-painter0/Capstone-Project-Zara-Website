"use strict";

const womensProducts = [
    {
        name: "Blue Mini Dress",
        image: "images/blueDress.jpeg",
        price: "$39.99",
        category: "dress"
    },
    {
        name: "Long Pleated Red Dress",
        image: "images/reddress2.jpeg",
        price: "$59.99",
        category: "dress"
    },
    {
        name: "Blue Pullover Sweatshirt",
        image: "images/bluePulloverW.jpeg",
        price: "$29.99",
        category: "shirts"
    },
    {
        name: "Cream Dress Pants",
        image: "images/dressPantsW.jpeg",
        price: "$48.99",
        category: "pants"

    },
    {
        name: "Green Short Sleeve T-shirt",
        image: "images/greenTeeW.jpeg",
        price: "$19.99",
        category: "shirts"

    },
    {
        name: "Light Wash Jeans",
        image: "images/lightwashJeansW.jpeg",
        price: "$59.99",
        category: "pants"

    },
    {
        name: "Ripped Jeans",
        image: "images/womenJeans1.jpeg",
        price: "$49.99",
        category: "pants"

    }

];

function displayProducts(list) {
    const container = document.getElementById('productResults');
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
}

// show all initially
displayProducts(womensProducts);

// Filter by Category 
document.getElementById('filter').addEventListener('change', (e) => {
    const value = e.target.value;

    if (value === "all") {
        displayProducts(womensProducts);
    } else {
        const filtered = womensProducts.filter(product => 
            product.category === value
        );
        displayProducts(filtered);
    }
});