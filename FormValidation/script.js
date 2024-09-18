const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Listen for form submit
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    checkInputs();     
});


// Validation function
function checkInputs() {
    // Get the values from inputs
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {
        // show error
        setErrorFor(username, 'Username cannot be blank');
    } else {
        // show success
        setSuccessFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else {
        setSuccessFor(password);
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Password check cannot be blank');
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords do not match');
    } else {
        setSuccessFor(password2);
    }
}

// // Function to display error
// function setErrorFor(input, message) {
//     const formControl = input.parentElement; // Get the parent element of input
//     const small = formControl.querySelector('small'); // Target the small element
//     formControl.className = 'formControl error'; // Add error class
//     small.innerText = message; // Display the error message

//     const errorIcon = formControl.querySelector('.fa-exclamation-circle');
//     const successIcon = formControl.querySelector('.fa-check-circle');

//     errorIcon.style.visibility = 'visible'; // Show error icon
//     successIcon.style.visibility = 'hidden'; // Hide success icon
// }

// // Function to display success
// function setSuccessFor(input) {
//     const formControl = input.parentElement; // Get the parent element of input
//     formControl.className = 'formControl success'; // Add success class

//     const errorIcon = formControl.querySelector('.fa-exclamation-circle');
//     const successIcon = formControl.querySelector('.fa-check-circle');

//     successIcon.style.visibility = 'visible'; // Show success icon
//     errorIcon.style.visibility = 'hidden'; // Hide error icon
// }

// Function to display error
function setErrorFor(input, message) {
    const formControl = input.parentElement; // Get the parent element of input
    const small = formControl.querySelector('small'); // Target the small element
    formControl.className = 'formControl error'; // Add error class to formControl
    input.classList.add('error'); // Add error class to input field
    small.innerText = message; // Display the error message

    const errorIcon = formControl.querySelector('.fa-exclamation-circle');
    const successIcon = formControl.querySelector('.fa-check-circle');

    errorIcon.style.visibility = 'visible'; // Show error icon
    successIcon.style.visibility = 'hidden'; // Hide success icon
}

// Function to display success
function setSuccessFor(input) {
    const formControl = input.parentElement; // Get the parent element of input
    formControl.className = 'formControl success'; // Add success class to formControl
    input.classList.remove('error'); // Remove error class from input field
    input.classList.add('success'); // Add success class to input field

    const errorIcon = formControl.querySelector('.fa-exclamation-circle');
    const successIcon = formControl.querySelector('.fa-check-circle');

    successIcon.style.visibility = 'visible'; // Show success icon
    errorIcon.style.visibility = 'hidden'; // Hide error icon
}


// Function to check if the email is valid
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
