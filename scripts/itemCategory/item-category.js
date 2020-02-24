import { itemCategoryUrl } from '../routes.js';
import { getToken } from '../authentication/jwt.js';

export function loadItems(category) {
    let itemArray = getItemsFromServer(category);
    const itemsArea = document.getElementsByClassName('items-area')[0];
}

function getItemsFromServer(category) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', itemCategoryUrl + category);
    xhr.onload = () => {
        if (xhr.status == 200) {
            let itemArray = xhr.response;
            console.log(itemArray);
        } else {
            displayMessage('Oops! Something went wrong. Please try again later.');
        }
    };
    xhr.send();
}

function displayMessage(message) {
    const messageArea = document.getElementsByClassName('message-area')[0];
    messageArea.innerHTML = message;
}