const items = require('../models/items');
const users = require('../models/users');
const accountController = require('./account-controller.js');
const auth = require('./authenticate-controller.js');

module.exports.getItem = (req, res, next) => {
    getItemsByCategory(req, res)
        .then(accountController.appendItemImages)
        .then(result => res.status(200).send(result))
}

function getItemsByCategory(req, res) {
    let category = req.params.category;

    return new Promise((resolve, reject) => {
        items.getItemsByCategory(category, function done(result) {
            resolve(result);
        });
    })
}

module.exports.buyItem = (req, res, next) => {
    getBuyerUsername(req, res)
        .then(buyerUsername => executePurchase(req, res, buyerUsername))

    // res.status(200).send(req.body);
}

function executePurchase(req, res, buyerUsername) {
    let itemId = req.body.itemId;
    let itemName = req.body.itemName;
    let ownerUsername = req.body.ownerUsername;
    let price = req.body.price;

    return new Promise((resolve, reject) => {
        items.buyItem(itemId, itemName, ownerUsername, buyerUsername, price, function done(result) {
            res.status(200).send(result);
        });
    });
}

function getBuyerUsername(req, res) {
    return new Promise((resolve, reject) => {
        // Extract the username of the buyer (the person making the request)
        auth.authenticateToken(req, res, (nil, user) => {
            let username = user.tokenData.username;
            users.getUser(username, fullUser => {
                let buyerUsername = fullUser.username;
                resolve(buyerUsername);
            });
        });
    })
}