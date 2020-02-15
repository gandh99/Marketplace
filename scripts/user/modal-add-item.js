import { getToken } from '../authentication/jwt.js'
import { addItemUrl } from '../routes.js';

// Submit the item to be added on the server
let addItemButton = document.getElementById('add-item-button');
addItemButton.addEventListener('click', () => {
    let imageFile = document.getElementById('modal-file-upload').files[0];
    let itemName = document.getElementById('item-name').value;
    let itemPrice = document.getElementById('item-price').value;
    
    // uploadItem(image, 'image/jpeg', itemName, itemPrice);
    sendDataToServer2(imageFile, itemName, itemPrice);
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

////

const sendDataToServer2 = function (file, itemName, itemPrice) {
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

////

const uploadItem = function (img, type, itemName, itemPrice) {
    convertToBase64(img, type, function (data) {
        sendDataToServer(data, itemName, itemPrice);
    });
};

const sendDataToServer = function (base64, itemName, itemPrice) {
    let xhr = new XMLHttpRequest();
    let path = addItemUrl;
    let data = JSON.stringify({
        image: base64,
        name: itemName,
        price: itemPrice
    });
    xhr.open("POST", path, true);
    xhr.onload = function (err) {
        if (xhr.status == 200) {
            console.log(xhr.response);
        } else {
            console.log(xhr.response);
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.send(data);
};

const convertToBase64 = function (img, imagetype, callback) {
    let canvas = document.createElement('CANVAS');
    let ctx = canvas.getContext('2d');
    let data = '';

    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0, canvas.height, canvas.width);
    data = canvas.toDataURL(imagetype);
    callback(data);
};
