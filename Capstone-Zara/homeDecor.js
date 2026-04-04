"use strict";

const homeProducts = [
    {
        name: "Round Rug",
        image: "images/roundrug.jpeg",
        price: "$100.00",
        category: "rug",
    },
    {
        name: "Rectangle Area Rug",
        image: "images/rectanglerug.jpeg",
        price: "$110.00",
        category: "rug",
    },
    {
        name: "Artificial Potted Rubber Plant",
        image: "images/rubberplant.jpeg",
        price: "$15.00",
        category: "plant",
    },
    {
        name: "Artifical Potted Tree",
        image: "images/tropicaltree.jpeg",
        price: "$31.00",
        category: "plant",
    },
    {
        name: "Artifical Potted Philodendron",
        image: "images/philodendron.jpeg",
        price: "$18.00",
        category: "plant",
    },
    {
        name: "Square Embroidered Throw Pillow",
        image: "images/embroideredthrowpillow.jpg",
        price: "$22.00",
        category: "pillow",
    },
    {
        name: "Embroidered Lumbar Pillow",
        image: "images/embroideredlumbarpillow.jpeg",
        price: "$23.00",
        category: "pillow",
    },
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
displayProducts(homeProducts);

// Filter by Category 
document.getElementById('filter').addEventListener('change', (e) => {
    const value = e.target.value;

    if (value === "all") {
        displayProducts(homeProducts);
    } else {
        const filtered = homeProducts.filter(product => 
            product.category === value
        );
        displayProducts(filtered);
    }
});