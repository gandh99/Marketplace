import { getToken } from '../authentication/jwt.js'
import { addItemUrl } from '../routes.js';
import { showErrors, removeErrors } from '../components/input-error-display.js';

// Submit the item to be added on the server
let addItemButton = document.getElementById('add-item-button');
addItemButton.addEventListener('click', () => {
    let imageFile = document.getElementById('modal-file-upload').files[0];
    let itemName = document.getElementById('item-name').value;
    let itemPrice = document.getElementById('item-price').value;

    sendItemToServer(imageFile, activeCategory, itemName, itemPrice);
});

// Allow the image to be previewed
let fileUpload = document.getElementById('modal-file-upload');
fileUpload.onchange = () => {
    if (fileUpload.files && fileUpload.files[0]) {
        var reader = new FileReader();

        reader.onload = (e) => {
            $('#modal-image-preview')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(fileUpload.files[0]);
    }
}

// Display category selected
let activeCategory;
const categoryDropBtn = document.getElementsByClassName('category-dropbtn')[0];
let categoryNames = document.getElementsByClassName('category-name');
for (let category of categoryNames) {
    category.addEventListener('click', () => {
        categoryDropBtn.innerHTML = category.innerHTML;
        activeCategory = category.innerHTML;
    });
}

function validateInput(file, itemCategory, itemName, itemPrice) {
    let errors = [];

    if (!file || !itemCategory || !itemName || !itemPrice) {
        errors.push('All fields must be filled in and the item must have an image uploaded.');
        return errors;
    }
    const pattern = /^[\w&.\-_]+$/;
    if (!itemName.match(pattern)) {
        errors.push('Item name has disallowed special characters.');
        return errors;
    }
    if (!Number(itemPrice)) {
        errors.push('Item price must be a number.');
        return errors;
    }

    return errors;
}

function sendItemToServer(file, itemCategory, itemName, itemPrice) {
    // Input validation before allowing data to be sent to server
    removeErrors();
    let errors = validateInput(file, itemCategory, itemName, itemPrice);
    if (errors.length > 0) {
        showErrors(errors);
        return;
    }

    let itemData = {
        category: itemCategory,
        name: itemName,
        price: itemPrice
    };
    let formData = new FormData();
    formData.append("imageFile", file);
    formData.append('itemData', JSON.stringify(itemData));

    let xhr = new XMLHttpRequest();
    xhr.open("POST", addItemUrl, true);
    xhr.onload = function (err) {
        if (xhr.status == 200) {
            console.log(xhr.response);
        } else if (xhr.status == 403) {
            showErrors(['Please login to add new items.']);
        }
    };
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.send(formData);
};