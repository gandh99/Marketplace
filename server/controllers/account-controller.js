const mv = require('mv');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
var base64Img = require('base64-img');
const auth = require('./authenticate-controller');
const users = require('../models/users');
const items = require('../models/items');

module.exports.addItem = (req, res, next) => {
    let itemData = {};
    new Promise((resolve, reject) => {
        // Extract the id of the user making the request
        auth.authenticateToken(req, res, (nil, user) => {
            let username = user.tokenData.username;
            users.getUser(username, fullUser => {
                itemData.userId = fullUser.user_id;
                resolve(itemData); // needs to be a string to resolve
            });
        });
    }).then((itemData) => {
        // Parse the form and extract item image and data
        var form = new formidable.IncomingForm();
        form.parse(req)
            .on('field', (name, field) => {
                itemData.itemCategory = JSON.parse(field).category;
                itemData.itemName = JSON.parse(field).name;
                itemData.itemPrice = JSON.parse(field).price;
            })
            .on('file', (name, file) => {
                // Get root directory of project
                let appDir = path.dirname(require.main.filename);

                // Move file from /tmp/ to new path
                let filename = itemData.userId + '_' + file.name;   // generate unique identifier for filename
                let oldPath = file.path;
                let newPath = appDir + '/itemImages/' + filename;
                itemData.itemImage = filename;  
                mv(oldPath, newPath, function (err) {
                    if (err) throw err;
                    return true
                });
                return saveItemToDatabase(itemData, res);
            })
    })
}

function saveItemToDatabase(itemData, res) {
    // Save item image and data into the database
    items.addNewItem(itemData.itemImage, itemData.itemCategory, itemData.itemName, itemData.itemPrice, itemData.userId, (result) => {
        res.status(200).send(result);
    });
}

module.exports.getItem = (req, res) => {
    getUserId(req, res)
        .then(getUserItems)
        .then(appendItemImages)
        .then(result => res.status(200).send(result))
}

function getUserId(req, res) {
    return new Promise((resolve, reject) => {
        // Extract the id of the user making the request
        auth.authenticateToken(req, res, (nil, user) => {
            let username = user.tokenData.username;
            users.getUser(username, fullUser => {
                let userId = fullUser.user_id;
                resolve(userId.toString()); // needs to be a string to resolve
            });
        });
    })
}

function getUserItems(userId) {
    return new Promise((resolve, reject) => {
        items.getItemsByOwnerId(userId, result => {
            resolve(result);
        });
    })
}

module.exports.appendItemImages = (result) => {
    // Iterate through the result, get the filenames for the images and convert them into base64
    return Promise.all(result.map(getImageOfSingleItem));
}

function getImageOfSingleItem(item) {
    const appDir = path.dirname(require.main.filename);

    return new Promise((resolve, reject) => {
        base64Img.base64(appDir + '/itemImages/' + item.item_image, (err, data) => { //CRUCIAL LINE!
            if (err) throw err;
            item.item_image_base64 = data;
            resolve(item)
        });
    })
}

module.exports.deleteItem = (req, res) => {
    let itemId = req.params.id;
    items.deleteItem(itemId, result => {
        res.status(200).send('Successfully deleted item.');
    })
}