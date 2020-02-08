const registerUrl = "http://localhost:5000/users/register";

function showErrors(errors) {
    const inputErrorsArea = document.getElementsByClassName('input-errors-area')[0];
    for (error of errors) {
        let inputError = document.createElement('div');
        inputError.className = 'input-error';
        inputError.textContent = error;
        inputErrorsArea.appendChild(inputError);
    }
}

const registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", () => {
    // Get user's input data
    const inputData = {
        username: document.getElementById('username').value,
        password1: document.getElementById('password1').value,
        password2: document.getElementById('password2').value
    };

    // Basic validation of input data
    const inputErrorsArea = document.getElementsByClassName('input-errors-area')[0];
    while (inputErrorsArea.firstChild) {
        inputErrorsArea.removeChild(inputErrorsArea.firstChild);
    };
    let errors = [];
    if (!inputData['username'] || inputData['username'].length < 3) {
        errors.push('Username must have at least 3 characters.');
    }
    if (errors.length != 0) {
        showErrors(errors);
        return;
    }

    // Send input data to server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', registerUrl);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = () => {
        // const data = JSON.parse(xhr.response);
        // console.log(data);
    };
    xhr.send(JSON.stringify(inputData));
});