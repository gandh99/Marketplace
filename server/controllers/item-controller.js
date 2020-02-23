const sql = require('../models/items');

module.exports.getItem = (req, res, next) => {
    let category = req.params.category;
    sql.getItemsByCategory(category, function done(result) {
        res.status(200).send(result);
    });
}