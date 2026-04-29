'use strict'

// SHIPPING FORM VALIDATION

const form = document.getElementById("shippingForm");

// Field rules
const fields = [
    {
        id: "first-name",
        validate: val => val.trim().length >= 2,
        message: "First name must be at least 2 characters"
    },
    {
        id: "last-name",
        validate: val => val.trim().length >= 2,
        message: "Last name must be at least 2 characters"
    },
    {
        id: "email",
        validate: val => val.includes("@") && val.includes("."),
        message: "Enter a valid email (example@email.com)"
    },
    {
        id: "address",
        validate: val => val.trim().length >= 5,
        message: "Enter a valid street address"
    },
    {
        id: "city",
        validate: val => val.trim().length >= 2,
        message: "Enter a valid city"
    },
    {
        id: "zip",
        validate: val => /^\d{5}(\d{4})?$/.test(val),
        message: "ZIP must be 5 or 9 digits"
    },
    {
        id: "states",
        validate: val => val !== "",
        message: "Please select a state"
    }
];

// REAL-TIME VALIDATION
fields.forEach(field => {
    const input = document.getElementById(field.id);
    const errorDiv = input.nextElementSibling;

    function validateField() {
        const value = input.value;

        if (!field.validate(value)) {
            input.classList.add("error");
            input.classList.remove("valid");
            errorDiv.textContent = field.message;
            return false;
        } else {
            input.classList.remove("error");
            input.classList.add("valid");
            errorDiv.textContent = "";
            return true;
        }
    }

    // Validate while typing
    input.addEventListener("input", validateField);

    // Validate when leaving field
    input.addEventListener("blur", validateField);
});


// SUBMIT VALIDATION
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let allValid = true;

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorDiv = input.nextElementSibling;

        if (!field.validate(input.value)) {
            input.classList.add("error");
            input.classList.remove("valid");
            errorDiv.textContent = field.message;
            allValid = false;
        }
    });

    if (allValid) {
        console.log("Form is valid!");
        form.submit(); // proceed
    } else {
        console.log("Fix errors before submitting");
    }
});