import { getItemUrl, deleteItemUrl } from '../routes.js';
import { getToken } from '../authentication/jwt.js';
import ConfirmationModal from '../components/confirmation-modal.js';

const itemsArea = document.getElementsByClassName('items-area')[0];

retrieveMyItems();

// Get the user's list of items
function retrieveMyItems() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', getItemUrl);
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.onload = () => {
        if (xhr.status == 200) {
            let itemArray = JSON.parse(xhr.response);
            displayItems(itemArray);
        } else if (xhr.status == 403) {
            let message = 'Please login to view your items';
            displayMessage(message);
        } 
    };
    xhr.send();
}

// Create an image from the base64Image and append it to the itemCardImage
function createItemImage(itemCardImage, base64Image) {
    let image = new Image();
    image.src = base64Image;
    image.style.width = '80%';
    itemCardImage.appendChild(image);
}

// Items is an array of JSON objects
function displayItems(itemArray) {
    for (let item of itemArray) {
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
    createItemImage(itemCardImage, item.item_image_base64);
    itemCardTitle.innerHTML = item.item_name;
    itemCardPrice.innerHTML = 'S$' + item.item_price;
    deleteButton.innerHTML = 'Remove Item';
    deleteButton.addEventListener('click', () => {
        displayConfirmationModal(deleteButton, item);
    });

    // Attach to item card
    itemCard.appendChild(itemCardImage);
    itemCard.appendChild(itemCardTitle);
    itemCard.appendChild(itemCardPrice);
    itemCard.appendChild(deleteButton);

    // Put item card in items area
    itemsArea.appendChild(itemCard);
}

function displayMessage(message) {
    const messageArea = document.getElementsByClassName('message-area')[0];
    messageArea.innerHTML = message;
}

function displayConfirmationModal(button, item) {
    const title = 'Delete Item';
    const message = 'Are you sure you wish to delete this item?';
    const deleteFunction = function() { deleteItem(item) };
    new ConfirmationModal().show(button, title, message, deleteFunction);
}

// Delete the item by supplying its item_id to the server
function deleteItem(item) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', deleteItemUrl + '/' + item.item_id);
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.onload = () => {
        if (xhr.status == 200) {
            location.reload();
        } else if (xhr.status == 403) {
            let message = 'Please login to delete your item';
            displayMessage(message);
        } 
    };
    xhr.send();
}