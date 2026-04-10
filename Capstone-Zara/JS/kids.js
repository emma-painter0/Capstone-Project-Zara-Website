"use strict";

const kidsProducts = [
    {
        name: "Girls Dress",
        image: "images/girlsDress.jpeg",
        price: "$15.99",
        category: "girls"
    },
    {
        name: "Girls Cheetah Pants",
        image: "images/girlsCheetahPants.jpeg",
        price: "$24.99",
        category: "girls"
    },
    {
        name: "Girls Heart Shirt",
        image: "images/girlsheartShirt.jpeg",
        price: "$12.99",
        category: "girls"
    },
    {
        name: "Boys Cargo Pants",
        image: "images/boysCargoPants.jpeg",
        price: "$24.99",
        category: "boys"

    },
    {
        name: "Boys Denim Shirt",
        image: "images/boysDenimShirt.jpeg",
        price: "$19.99",
        category: "boys"

    },
    {
        name: "Boys Pullover And Jeans Set",
        image: "images/boysSet.jpeg",
        price: "$39.99",
        category: "boys"

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

        // Click → go to product page
        card.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = "productDetails.html";
        });

        container.appendChild(card);
    });
        }, 500);
}

// Show all initially
displayProducts(kidsProducts);

document.getElementById('filter').addEventListener('change', (e) => {
    const value = e.target.value;

    if (value === "all") {
        displayProducts(kidsProducts);
    } else {
        const filtered = kidsProducts.filter(product => product.category === value);
        displayProducts(filtered);
    }
});
