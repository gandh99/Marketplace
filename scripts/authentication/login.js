import { loginUrl } from '../routes.js';

const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", () => {
    // Get user's input data
    const inputData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
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
        .then(response => {
            if (response.status == 401) {
                showErrors([response.data]);
            } else if (response.status == 200) {
                removeErrors();
                showSuccessMessage();
                clearForm();
                // window.location.href = '../../index.html';
            }
        }).catch(err => {
            console.log(err);
        });
});

function showErrors(errors) {
    const inputErrorsArea = document.getElementsByClassName('input-errors-area')[0];
    for (let error of errors) {
        let inputError = document.createElement('div');
        inputError.className = 'input-error';
        inputError.textContent = error;
        inputErrorsArea.appendChild(inputError);
    }
}

function removeErrors() {
    const inputErrorsArea = document.getElementsByClassName('input-errors-area')[0];
    while (inputErrorsArea.firstChild) {
        inputErrorsArea.removeChild(inputErrorsArea.firstChild);
    };
}

function validateInput(inputData) {
    let errors = [];

    if (inputData['username'].length <= 0) {
        errors.push('Username must not be blank.');
    }
    if (inputData['password'].length <= 0) {
        errors.push('Password must not be blank.');
    }

    return errors;
}

function showSuccessMessage() {
    const inputErrorsArea = document.getElementsByClassName('input-errors-area')[0];
    let successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML =
        'Login successful.';
    inputErrorsArea.appendChild(successMessage);
}

function clearForm() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function sendInputData(inputData) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', loginUrl);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onload = () => {
            resolve({status: xhr.status, data: xhr.response});
        };
        xhr.send(JSON.stringify(inputData));
    });

    return promise;
}