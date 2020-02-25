const items = require('../models/items');
const accountController = require('./account-controller.js');

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
    res.status(200).send(req.body);
}