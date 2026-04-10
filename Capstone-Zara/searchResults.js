"use strict";

const womensProducts = [
    { 
      name: "Short Long Sleeve Red Dress", 
      image: "images/reddress1.jpeg",
      price: "$49.99",
      description: "A stylish short long sleeve red dress perfect for parties."
    },
    { 
      name: "Long Pleated Red Dress", 
      image: "images/reddress2.jpeg",
      price: "$59.99",
      description: "Elegant long pleated red dress for formal occasions."
    },
    { 
      name: "One shoulder Red Dress", 
      image: "images/reddress3.jpeg",
      price: "$54.99",
      description: "Trendy one shoulder red dress for casual or evening wear."
    },
    { 
      name: "Short Red Dress", 
      image: "images/reddress4.jpeg",
      price: "$39.99",
      description: "Simple short red dress, comfortable and stylish."
    },
    { 
      name: "Women's Jeans", 
      image: "images/womenJeans1.jpeg",
      price: "$69.99",
      description: "Classic women's jeans, versatile and durable."
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
        container.appendChild(card);

        card.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = "productDetails.html";
        });
    });
}, 500);
}

displayProducts(womensProducts);

document.getElementById('searchBar').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = womensProducts.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
});
