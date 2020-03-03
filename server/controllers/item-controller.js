const items = require('../models/items');
const users = require('../models/users');
const accountController = require('./account-controller.js');
const auth = require('./authenticate-controller.js');

module.exports.getActiveItems = (req, res, next) => {
    getItemsByCategory(req, res)
        .then(accountController.appendItemImages)
        .then(result => res.status(200).send(result))
}

function getItemsByCategory(req, res) {
    let category = req.params.category;
    let sortBy = req.query.sortBy;

    return new Promise((resolve, reject) => {
        items.getItemsByCategory(category, function done(result) {
            resolve(result);
        });
    })
}

module.exports.buyItem = (req, res, next) => {
    getUsername(req, res)   // Extract the username of the buyer (the person making the request)
        .then(buyerUsername => executePurchase(req, res, buyerUsername))
        .then(result => res.status(200).send('Successful purchase.'))
}

function executePurchase(req, res, buyerUsername) {
    let itemId = req.body.itemId;
    let itemCategory = req.body.itemCategory;
    let itemName = req.body.itemName;
    let ownerUsername = req.body.ownerUsername;
    let price = req.body.price;

    return new Promise((resolve, reject) => {
        items.buyItem(itemId, itemCategory, itemName, ownerUsername, buyerUsername, price, function done(result) {
            resolve(result);
        });
    });
}

function getUsername(req, res) {
    return new Promise((resolve, reject) => {
        auth.authenticateToken(req, res, (nil, user) => {
            let username = user.tokenData.username;
            users.getUser(username, fullUser => {
                let currentUsername = fullUser.username;
                resolve(currentUsername);
            });
        });
    })
}

module.exports.getTransactedItems = (req, res, next) => {
    getUsername(req, res)
        .then(getTransactedItemsFromDatabase)
        .then(result => {
            res.status(200).send(result);
        })
}

function getTransactedItemsFromDatabase(username) {
    return new Promise((resolve, reject) => {
        items.getTransactedItemsByUser(username, result => {
            resolve(result);
        })
    })
}