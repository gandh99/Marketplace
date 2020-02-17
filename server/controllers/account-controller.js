const mv = require('mv');
const path = require('path');
const formidable = require('formidable');
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
                let oldPath = file.path;
                let newPath = appDir + '/itemImages/' + file.name;
                itemData.itemImage = file.name;  //TODO: hash this name
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

module.exports.getItem = (req, res, next) => {
    new Promise((resolve, reject) => {
        // Extract the id of the user making the request
        auth.authenticateToken(req, res, (nil, user) => {
            let username = user.tokenData.username;
            users.getUser(username, fullUser => {
                let userId = fullUser.user_id;
                resolve(userId.toString()); // needs to be a string to resolve
            });
        });
    }).then((userId) => {
        items.getItemsByOwnerId(userId, result => {
            res.status(200).send(result)
        });
    })
}