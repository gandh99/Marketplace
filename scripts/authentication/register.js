import { registerUrl } from '../routes.js';
import { showErrors, removeErrors } from '../components/input-error-display.js';

const registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", () => {
    // Get user's input data
    const inputData = {
        username: document.getElementById('username').value,
        password1: document.getElementById('password1').value,
        password2: document.getElementById('password2').value
    };

    // Client-side validation of input data
    removeErrors();
    let errors = validateInput(inputData);
    if (errors.length != 0) {
        showErrors(errors);
        return;
    }

    // Send input data to server
    sendInputData(inputData)
        .then(responseData => {
            if (responseData !== '') {
                showErrors([responseData]);
            } else {
                removeErrors();
                showSuccessMessage();
                clearForm();
            }
        }).catch(err => {
            console.log(err);
        });
});

function validateInput(inputData) {
    let errors = [];

    if (inputData['username'].length < 3) {
        errors.push('Username must have at least 3 characters.');
    }
    if (inputData['password1'].length < 6) {
        errors.push('Password must have at least 6 characters.');
    }
    if (inputData['password1'] !== inputData['password2']) {
        errors.push('Passwords must match.');
    }

    return errors;
}

function showSuccessMessage() {
    const inputErrorsArea = document.getElementsByClassName('input-errors-area')[0];
    let successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML =
        'Registration successful. Please click <a href="/html/authentication/login.html">here</a> to login.';
    inputErrorsArea.appendChild(successMessage);
}

function clearForm() {
    document.getElementById('username').value = '';
    document.getElementById('password1').value = '';
    document.getElementById('password2').value = '';
}

function sendInputData(inputData) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', registerUrl);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onload = () => {
            // const data = JSON.parse(xhr.response);
            resolve(xhr.response);
        };
        xhr.send(JSON.stringify(inputData));
    });

    return promise;
}