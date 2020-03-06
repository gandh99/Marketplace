import { destroyTokens } from './jwt.js';

let logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    destroyTokens();
    removeUsername();
    window.location.href = '/index.html';
});

function removeUsername() {
    sessionStorage.removeItem('username');
}