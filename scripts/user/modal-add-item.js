let addItemButton = document.getElementById('add-item-button');
addItemButton.addEventListener('click', () => {
    let image = document.getElementById('file-upload').files[0];
    let itemName = document.getElementById('item-name');
    let itemPrice = document.getElementById('item-price');

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
        const canvas = ctrl.ctx.canvas;
        canvas.parentNode.removeChild(canvas);
    }, false);
    xhr.open("POST", "http://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php");
    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
    reader.onload = function (evt) {
        xhr.send(evt.target.result);
    };
    reader.readAsBinaryString(file);
}