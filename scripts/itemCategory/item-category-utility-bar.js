import { itemsHolder, sortItems } from './item-category.js';

// Search functionality
let searchTerm = document.getElementsByClassName('searchTerm')[0];
searchTerm.addEventListener('keyup', () => {
    let searchValue = searchTerm.value;
    itemsHolder.filterBySearchValue(searchValue);
});

// Sort functionality
let sortOptions = document.getElementsByClassName('sort-name');
for (let option of sortOptions) {
    option.addEventListener('click', () => {
        searchTerm.value = '';
        sortItems(option.id);
    })
}