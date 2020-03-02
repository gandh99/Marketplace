import { itemCategoryUrl, buyItemUrl } from '../routes.js';
import { getToken } from '../authentication/jwt.js';
import ItemsHolder from './items-holder.js';

// Stores and displays all the items
let itemsHolder;

// Category name supplied must match the name in the database
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
        }
    };
    xhr.send(JSON.stringify(itemData));
}

// Search functionality
let searchTerm = document.getElementsByClassName('searchTerm')[0];
searchTerm.addEventListener('keyup', () => {
    let searchValue = searchTerm.value;
    itemsHolder.filterBySearchValue(searchValue);
});