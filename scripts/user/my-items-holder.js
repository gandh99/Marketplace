import ConfirmationModal from '../components/confirmation-modal.js';
import { deleteItem } from './my-items.js';
import { displayMessage } from './my-items.js';

export default class MyItemsHolder {
    constructor(itemsArea, itemArray) {
        this.itemArray = itemArray;
        this.itemsArea = itemsArea;
    }

    displayItems(itemArray) {
        this.removeAllItems();
        displayMessage('');

        if (itemArray.length == 0) {
            displayMessage('No items to show.');
        }

        for (let item of itemArray) {
            this.createItem(item);
        }
    }

    createItem(item) {
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
        this.createItemImage(itemCardImage, item.item_image_base64);
        itemCardTitle.innerHTML = item.item_name;
        itemCardPrice.innerHTML = 'S$' + item.item_price;
        deleteButton.innerHTML = 'Remove Item';
        deleteButton.addEventListener('click', () => {
            this.displayConfirmationModal(deleteButton, item);
        });

        // Attach to item card
        itemCard.appendChild(itemCardImage);
        itemCard.appendChild(itemCardTitle);
        itemCard.appendChild(itemCardPrice);
        itemCard.appendChild(deleteButton);

        // Put item card in items area
        this.itemsArea.appendChild(itemCard);
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
        const title = 'Delete Item';
        const message = 'Are you sure you wish to delete this item?';
        const deleteFunction = function () { deleteItem(item) };
        new ConfirmationModal().show(button, title, message, deleteFunction);
    }
}