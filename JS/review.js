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

const reviewInput = document.getElementById('review');

// Error messages
const ratingErrorMsg = document.getElementById('rating-error-msg');
const reviewErrorMsg = document.getElementById('review-error-msg');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reviewText = document.getElementById('review').value.trim();
    console.log(selectedRating);
    if(selectedRating === 0) {
        starContainer.classList.add("invalid");
        ratingErrorMsg.innerHTML = "<p>Select a star rating.</p>";
        ratingErrorMsg.classList.remove("hidden");
        return;
    }
    else {
        starContainer.classList.remove("invalid");
        ratingErrorMsg.classList.add("hidden");
    }

    if(reviewText.length < 1) {
        reviewInput.classList.add("invalid");
        reviewErrorMsg.innerHTML = "<p>Review cannot be empty!</p>";
        reviewErrorMsg.classList.remove("hidden");
        return;
    }
    else {
        reviewInput.classList.remove("invalid");
        reviewErrorMsg.classList.add("hidden");
    }

    const container = document.querySelector("main > div");
    const mainPage = document.querySelector("main");

    container.classList.add("hidden");
    const spinner = document.createElement("div");
    spinner.classList.add("loading-spinner");
    spinner.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`
    mainPage.appendChild(spinner);

    setTimeout(() => {
        mainPage.removeChild(document.querySelector(".loading-spinner"));
        container.classList.remove("hidden");

        const review = { rating: selectedRating, text: reviewText };
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        reviewForm.reset();
        selectedRating = 0;
        updateStars();
        displayReviews();
    }, 500);
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