const registerUrl = "http://localhost:5000/users/register";

const registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', registerUrl);
    xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        console.log(data);
    };
    xhr.send();
});