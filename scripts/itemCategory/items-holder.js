import ConfirmationModal from '../components/confirmation-modal.js';
import { buyItem } from './item-category.js';

export default class ItemsHolder {
    constructor(itemsArea, itemArray) {
        this.itemArray = itemArray;
        this.itemsArea = itemsArea;
    }

    displayItems(itemArray) {
        this.removeAllItems();

        for (let item of itemArray) {
            this.createItem(item);
        }
    }

    createItem(item) {
        // Create div
        let itemContainer = document.createElement('div');
        let itemCardImage = document.createElement('div');
        let itemOwner = document.createElement('div');
        let itemName = document.createElement('div');
        let itemPrice = document.createElement('div');
        let buyButton = document.createElement('div');

        // Assign class
        itemContainer.setAttribute('class', 'item-container');
        itemCardImage.setAttribute('class', 'item-image');
        itemOwner.setAttribute('class', 'item-owner');
        itemName.setAttribute('class', 'item-name');
        itemPrice.setAttribute('class', 'item-price');
        buyButton.setAttribute('class', 'buy-button');
        buyButton.addEventListener('click', () => {
            this.displayConfirmationModal(buyButton, item);
        });

        // Add the data
        this.createItemImage(itemCardImage, item.item_image_base64);
        itemOwner.innerHTML = item.owner_username;
        itemName.innerHTML = item.item_name;
        itemPrice.innerHTML = 'S$' + item.item_price;
        buyButton.innerHTML = 'Buy';

        // Append to itemsArea
        itemContainer.appendChild(itemCardImage);
        // itemContainer.appendChild(itemOwner);
        itemContainer.appendChild(itemName);
        itemContainer.appendChild(itemPrice);
        itemContainer.appendChild(buyButton);
        this.itemsArea.appendChild(itemContainer);
    }

    // Create an image from the base64Image and append it to the itemCardImage
    createItemImage(itemCardImage, base64Image) {
        let image = new Image();
        image.src = base64Image;
        image.style.width = '80%';
        itemCardImage.appendChild(image);
    }

    filterBySearchValue(searchValue) {
        let filteredItems = [];
        for (let item of this.itemArray) {
            if (item.item_name.includes(searchValue)) {
                filteredItems.push(item);
            }
        }

        this.displayItems(filteredItems);
    }

    removeAllItems() {
        this.itemsArea.innerHTML = '';
    }

    displayConfirmationModal(button, item) {
        const title = 'Buy Item';
        const message = 'Are you sure you wish to purchase this item?';
        const buyFunction = function () { buyItem(item) };
        new ConfirmationModal().show(button, title, message, buyFunction);
    }
}