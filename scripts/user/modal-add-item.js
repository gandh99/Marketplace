import { getToken } from '../authentication/jwt.js'
import { addItemUrl } from '../routes.js';

// Submit the item to be added on the server
let addItemButton = document.getElementById('add-item-button');
addItemButton.addEventListener('click', () => {
    let imageFile = document.getElementById('modal-file-upload').files[0];
    let itemName = document.getElementById('item-name').value;
    let itemPrice = document.getElementById('item-price').value;
    
    sendItemToServer(imageFile, itemName, itemPrice);
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

const sendItemToServer = (file, itemName, itemPrice) => {
    let xhr = new XMLHttpRequest();
    let path = addItemUrl;
    var formData = new FormData();
    formData.append("imageFile", file);

    xhr.open("POST", path, true);
    xhr.onload = function (err) {
        if (xhr.status == 200) {
            console.log(xhr.response);
        } else {
            console.log(xhr.response);
        }
    };
    // xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.send(formData);
};