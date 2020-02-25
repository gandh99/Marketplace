import { itemCategoryUrl } from '../routes.js';
import { getToken } from '../authentication/jwt.js';
import ItemsHolder from './items-holder.js';

export function loadItems(category) {
    getItemsFromServer(category)
        .then(itemArray => {
            displayItems(itemArray);
        })
}

function getItemsFromServer(category) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', itemCategoryUrl + category);
        xhr.onload = () => {
            if (xhr.status == 200) {
                let itemArray = xhr.response;
                resolve(JSON.parse(itemArray));
            } else {
                displayMessage('Oops! Something went wrong. Please try again later.');
            }
        };
        xhr.send();
    })
}

function displayItems(itemArray) {
    const itemsArea = document.getElementsByClassName('items-area')[0];
    let itemsHolder = new ItemsHolder(itemsArea, itemArray);
    itemsHolder.displayItems(itemArray);
}

function displayMessage(message) {
    const messageArea = document.getElementsByClassName('message-area')[0];
    messageArea.innerHTML = message;
}

export function buyItem(item) {
    console.log(item);
}