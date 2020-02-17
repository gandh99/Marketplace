import { getItemUrl } from '../routes.js';
import { getToken } from '../authentication/jwt.js';

const itemsArea = document.getElementsByClassName('items-area')[0];

retrieveMyItems();

// Get the user's list of items
function retrieveMyItems() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', getItemUrl);
    // xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.onload = () => {
        console.log({status: xhr.status, data: xhr.response});
    };
    xhr.send();
}

// Items is an array of JSON objects
function displayItems(items) {
    for (let item of items) {
        createItem(item);
    }
}

function createItem(item) {
    // Create the html elements
    let itemCard = document.createElement('div');
    let itemCardImage = document.createElement('div');
    let itemCardTitle = document.createElement('div');
    let itemCardPrice = document.createElement('div');
    let deleteButton = document.createElement('div');
    
    // Assign the necessary attributes
    itemCard.setAttribute('class', 'item-card');
    itemCardImage.setAttribute('class', 'item-card-image');
    itemCardTitle.setAttribute('class', 'item-card-title');
    itemCardPrice.setAttribute('class', 'item-card-price');
    deleteButton.setAttribute('class', 'item-card-delete-button');

    // Add the item data
    // itemCardImage.innerHTML = ;
    itemCardTitle.innerHTML = item.title;
    itemCardPrice.innerHTML = item.price;
    deleteButton.innerHTML = 'Remove Item';

    // Attach to item card
    itemCard.appendChild(itemCardImage);
    itemCard.appendChild(itemCardTitle);
    itemCard.appendChild(itemCardPrice);
    itemCard.appendChild(deleteButton);

    // Put item card in items area
    itemsArea.appendChild(itemCard);
}