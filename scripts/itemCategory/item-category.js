import { itemCategoryUrl } from '../routes.js';
import { getToken } from '../authentication/jwt.js';

export function loadItems(category) {
    let itemArray = getItemsFromServer(category);
    const itemsArea = document.getElementsByClassName('items-area')[0];
}

function getItemsFromServer(category) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', itemCategoryUrl + category);
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.onload = () => {
        if (xhr.status == 200) {
            let itemArray = xhr.response;
            console.log(itemArray);
        } else if (xhr.status == 403) {

        }
    };
    xhr.send();
}