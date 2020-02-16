const db = require('../db');

module.exports.addNewItem = (itemImage, itemCategory, itemName, itemPrice, ownerId, done) => {
    let data = { 
        item_image: itemImage, 
        item_category: itemCategory, 
        item_name: itemName,
        item_price: itemPrice, 
        owner_id: ownerId
    };
    let sql = 'INSERT INTO active_items SET ?';
    db.get().query(sql, data, (err, result) => {
        if (err) throw err;
        done(result[0]);
    });
};