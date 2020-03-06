import { getItemUrl, deleteItemUrl } from '../../routes.js';
import { getToken, refreshToken } from '../../authentication/jwt.js';
import MyItemsHolder from './my-items-holder.js';

const itemsArea = document.getElementsByClassName('items-area')[0];
const messageArea = document.getElementsByClassName('message-area')[0];
let myItemsHolder;
let hasRefreshed = false;

retrieveMyItems();

// Get the user's list of items from the server
function retrieveMyItems() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', getItemUrl);
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.onload = () => {
        if (xhr.status == 200) {
            let itemArray = JSON.parse(xhr.response);
            myItemsHolder = new MyItemsHolder(itemsArea, itemArray);
            myItemsHolder.displayItems(itemArray);
            hasRefreshed = true;
        } else if (xhr.status == 401 || xhr.status == 403) {
            if (!hasRefreshed) {
                refreshToken(retrieveMyItems);
            } else {
                displayMessage('Please <a href="/html/authentication/login.html">login</a> to view your items');
                hideUtilityBar();
                hasRefreshed = false;
            }
        } else {
            console.log(xhr.response)
            displayMessage('Oops! An error occurred. Please try again later.');
        }
    };
    xhr.send();
}

// Delete the item by supplying its item_id to the server
export function deleteItem(item) {
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

function hideUtilityBar() {
    const utilityBar = document.getElementsByClassName('utility-bar')[0];
    utilityBar.style.display = 'none';
}

export function displayMessage(message) {
    messageArea.innerHTML = message;
}

// Implement search functionality 
let searchTerm = document.getElementsByClassName('searchTerm')[0];
searchTerm.addEventListener('keyup', () => {
    let searchValue = searchTerm.value;
    myItemsHolder.filterBySearchValue(searchValue);
});

// Infinite scroll
var scrollContainer = document.getElementsByClassName('items-area')[0];
var infiniteScroll = new InfiniteScroll(scrollContainer, {
    // Options
    path: '.pagination__next',
    append: '.post',
    history: false,
});