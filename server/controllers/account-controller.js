const mv = require('mv');
const path = require('path');
const formidable = require('formidable');
const auth = require('./authenticate-controller');
const users = require('../models/users');
const items = require('../models/items');

module.exports.addItem = (req, res, next) => {
    // Extract the id of the user making the request
    let userId;
    auth.authenticateToken(req, res, (nil, user) => {
        let username = user.tokenData.username;
        users.getUser(username, fullUser => {
            userId = fullUser.user_id;
        });
    });

    // Parse the form and extract item image and data
    let itemImage, itemCategory, itemName, itemPrice;
    var form = new formidable.IncomingForm();
    form.parse(req)
        .on('field', (name, field) => {
            itemCategory = field.category;
            itemName = field.name;
            itemPrice = field.price;
            // res.status(200).send(field)
        })
        .on('file', (name, file) => {
            // Get root directory of project
            let appDir = path.dirname(require.main.filename);

            // Move file from /tmp/ to new path
            let oldPath = file.path;
            let newPath = appDir + '/itemImages/' + file.name;
            itemImage = file.name;  //TODO: hash this name
            mv(oldPath, newPath, function (err) {
                if (err) throw err;
            });
        })
 
    // Save item image and data into the database
    items.addNewItem(itemImage, itemCategory, itemName, itemPrice, userId, (result) => {
        res.status(200).send(result);
    });
}