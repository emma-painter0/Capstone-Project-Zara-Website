"use strict";

const starContainer = document.getElementById('starRating');
const stars = starContainer.querySelectorAll('span');
let selectedRating = 0;

// Function to update star fill
function updateStars() {
    stars.forEach(star => {
        if (parseInt(star.dataset.value) <= selectedRating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

// Hover effect
stars.forEach(star => {
    star.addEventListener('mouseover', () => {
        stars.forEach(s => s.classList.remove('filled'));
        for(let i=0; i<star.dataset.value; i++) {
            stars[i].classList.add('filled');
        }
    });

    star.addEventListener('mouseout', () => {
        updateStars(); // revert to selected rating
    });

    star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value);
        updateStars(); // fill stars permanently
    });
});

function updateStars() {
    stars.forEach(s => s.style.color = '#ccc');
    for(let i=0; i<selectedRating; i++) {
        stars[i].style.color = 'gold';
    }
}

// Handle form submission
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reviewText = document.getElementById('review').value.trim();
    if(selectedRating === 0) {
        alert("Please select a star rating!");
        return;
    }
    if(!reviewText) {
        alert("Please write a review!");
        return;
    }

    const review = { rating: selectedRating, text: reviewText };
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    reviewForm.reset();
    selectedRating = 0;
    updateStars();
    displayReviews();
});

// Display saved reviews
function displayReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviewsList.innerHTML = '';
    reviews.forEach(r => {
        const div = document.createElement('div');
        div.classList.add('review-item');
        div.innerHTML = `
            <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
            <p>${r.text}</p>
        `;
        reviewsList.appendChild(div);
    });
}

// Initial load
displayReviews();