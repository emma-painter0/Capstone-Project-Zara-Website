"use strict";

const mensProducts = [
    {
        name: "Denim Collared Shirt",
        image: "images/denimCollaredShirt.jpeg",
        price: 29.99,
        category: "shirts"
    },
    {
        name: "Graphic T-Shirt",
        image: "images/graphicTee.jpeg",
        price: 19.99,
        category: "shirts"
    },
    {
        name: "Khaki Cargo Pants",
        image: "images/khakiCargos.jpeg",
        price: 49.99,
        category: "pants"
    },
    {
        name: "Linen Pants",
        image: "images/linenPantsM.jpeg",
        price: 39.99,
        category: "pants"

    },
    {
        name: "Beige Mens Blazer",
        image: "images/blazer.jpeg",
        price: 79.99,
        category: "jackets"

    },
    {
        name: "Pink Collared Shirt",
        image: "images/mensCollaredShirt.jpeg",
        price: 59.99,
        category: "shirts"

    },
    {
        name: "Striped Linen Collared Shirt",
        image: "images/menShirt1.jpeg",
        price: 49.99,
        category: "shirts"

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
displayProducts(mensProducts);

// Filter by Category 
document.getElementById('filter').addEventListener('change', (e) => {
    const value = e.target.value;

    if (value === "all") {
        displayProducts(mensProducts);
    } else {
        const filtered = mensProducts.filter(product => 
            product.category === value
        );
        displayProducts(filtered);
    }
});
