import { destroyToken } from './jwt.js';

let logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    destroyToken();
    removeUsername();
    window.location.href = '/index.html';
});

function removeUsername() {
    sessionStorage.removeItem('username');
}