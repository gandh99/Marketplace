import { itemCategoryUrl } from '../routes.js';
import { getToken } from '../authentication/jwt.js';

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
    for (let item of itemArray) {
        createItem(item);
    }
}

function createItem(item) {
    const itemsArea = document.getElementsByClassName('items-area')[0];

    // Create div
    let itemContainer = document.createElement('div');
    let itemCardImage = document.createElement('div');
    let itemName = document.createElement('div');
    let itemPrice = document.createElement('div');

    // Assign class
    itemContainer.setAttribute('class', 'item-container');
    itemCardImage.setAttribute('class', 'item-image');
    itemName.setAttribute('class', 'item-name');
    itemPrice.setAttribute('class', 'item-price');

    // Add the data
    createItemImage(itemCardImage, item.item_image_base64);
    itemName.innerHTML = item.item_name;
    itemPrice.innerHTML = item.item_price;

    // Append to itemsArea
    itemContainer.appendChild(itemCardImage);
    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemPrice);
    itemsArea.appendChild(itemContainer);
}

function createItemImage(itemCardImage, base64Image) {
    let image = new Image();
    image.src = base64Image;
    image.style.width = '80%';
    itemCardImage.appendChild(image);
}

function displayMessage(message) {
    const messageArea = document.getElementsByClassName('message-area')[0];
    messageArea.innerHTML = message;
}