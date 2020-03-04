import { itemCategoryUrl, buyItemUrl } from '../routes.js';
import { getToken } from '../authentication/jwt.js';
import ItemsHolder from './items-holder.js';

// Stores and displays all the items
export let itemsHolder;

// Tracks the current category
let category;

// Category name supplied must match the name in the database
export function loadItems(categoryName) {
    category = categoryName;
    getItemsFromServer(null)
        .then(itemArray => {
            displayItems(itemArray);
        })
}

export function sortItems(sortBy) {
    getItemsFromServer(sortBy)
        .then(itemArray => {
            displayItems(itemArray);
        })
}

function getItemsFromServer(sortBy) {
    // Set the endpoint
    let apiEndpoint = itemCategoryUrl + category;
    if (sortBy) {
        apiEndpoint += '?sortBy=' + sortBy;
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', apiEndpoint);
        xhr.onload = () => {
            if (xhr.status == 200) {
                let itemArray = xhr.response;console.log(itemArray)
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
    itemsHolder = new ItemsHolder(itemsArea, itemArray);
    itemsHolder.displayItems(itemArray);
}

function displayMessage(message) {
    const messageArea = document.getElementsByClassName('message-area')[0];
    messageArea.innerHTML = message;
}

export function buyItem(item) {
    const itemData = {
        itemId: item.item_id,
        itemCategory: item.item_category,
        itemName: item.item_name,
        ownerUsername: item.owner_username,
        price: item.item_price
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', buyItemUrl);
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = () => {
        if (xhr.status == 200) {
            location.reload();
        } else {
            console.log(xhr.status + '; Oops! Something went wrong. Please try again later.');
            window.location.href = '/html/authentication/login.html';
        }
    };
    xhr.send(JSON.stringify(itemData));
}