const db = require('../db');

module.exports.addNewItem = (itemImage, itemCategory, itemName, itemPrice, ownerId, ownerUsername, done) => {
    let data = { 
        item_image: itemImage, 
        item_category: itemCategory, 
        item_name: itemName,
        item_price: itemPrice, 
        owner_id: ownerId,
        owner_username: ownerUsername
    };
    let sql = 'INSERT INTO active_items SET ?';
    db.get().query(sql, data, (err, result) => {
        if (err) throw err;
        done(result[0]);
    });
};

module.exports.getItemsByOwnerId = (ownerId, done) => {
    let sql = 'SELECT * FROM active_items WHERE owner_id = ?';
    db.get().query(sql, ownerId, (err, result) => {
        if (err) throw err;
        done(result);
    })
}

module.exports.getItemsByCategory = (category, done) => {
    let sql = 'SELECT * FROM active_items WHERE item_category = ?';
    db.get().query(sql, category, (err, result) => {
        if (err) throw err;
        done(result);
    })
}

module.exports.deleteItem = (itemId, done) => {
    let sql = 'DELETE FROM active_items WHERE item_id = ?';
    db.get().query(sql, itemId, (err, result) => {
        if (err) throw err;
        done(result);
    })
}

module.exports.buyItem = (itemId, itemName, ownerUsername, buyerUsername, price, done) => {
    // Remove the item from active_items

    // Record the buy/sell transaction
    let transactionData = {
        item_name: itemName,
        buyer_username: buyerUsername,
        seller_username: ownerUsername,
        item_price: price
    }
    let transactionSql = 'INSERT INTO transacted_items SET ?';
    db.get().query(transactionSql, transactionData, (err, result) => {
        if (err) throw err;
        done(result);
    })
}