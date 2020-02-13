import { addItemUrl } from '../routes.js';

let addItemButton = document.getElementById('add-item-button');
addItemButton.addEventListener('click', () => {
    let image = document.getElementById('file-upload').files[0];
    let itemName = document.getElementById('item-name');
    let itemPrice = document.getElementById('item-price');
    console.log(image);
    upload(image);
});

function upload(file) {
    const reader = new FileReader();
    const xhr = new XMLHttpRequest();
    
    const self = this;
    xhr.upload.addEventListener("progress", function (e) {
        if (e.lengthComputable) {
            const percentage = Math.round((e.loaded * 100) / e.total);
        }
    }, false);

    xhr.upload.addEventListener("load", function (e) {

    }, false);
    xhr.open("POST", addItemUrl);
    xhr.onload = () => { console.log(xhr.response) };
    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
    reader.onload = function (evt) {
        xhr.send(evt.target.result);
    };
    reader.readAsBinaryString(file);
}