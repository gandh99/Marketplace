import { getToken } from '../authentication/jwt.js'
import { addItemUrl } from '../routes.js';

// Submit the item to be added on the server
let addItemButton = document.getElementById('add-item-button');
addItemButton.addEventListener('click', () => {
    let image = document.getElementById('modal-image-preview');
    let itemName = document.getElementById('item-name');
    let itemPrice = document.getElementById('item-price');

    uploadImage(image, 'My Item', 'image/jpeg');
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

const convertToBase64 = function (img, imagetype, callback) {
    let canvas = document.createElement('CANVAS');
    let ctx = canvas.getContext('2d');
    let data = '';

    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    data = canvas.toDataURL(imagetype);
    callback(data);
};

const sendBase64ToServer = function (name, base64) {
    let xhr = new XMLHttpRequest();
    let path = addItemUrl;
    let data = JSON.stringify({ image: base64 });
    xhr.onload = function (err) {
        if (xhr.status == 200) {
            console.log(xhr.response);
        } else {
            console.log(xhr.response);
        }
    };
    // Set the content type of the request to json since that's what's being sent
    xhr.open("POST", path, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.send(data);
};

const uploadImage = function (img, name, type) {
    convertToBase64(img, type, function (data) {
        sendBase64ToServer(name, data);
    });
};