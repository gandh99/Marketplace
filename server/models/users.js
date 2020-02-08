const db = require('../db');

module.exports.insertUser = function (username, password, done) {
    let user = { username: username, password: password };

    new Promise((resolve, reject) => {
        // Check if user already exists
        let checkSql = 'SELECT * FROM users where username = ?';
        db.get().query(checkSql, username, (err, result) => {
            if (err) throw err;
            if (result.length >= 1) {
                done('Username already exists.');
                resolve(false);
            }
        });
    }).then((shouldInsertUser) => {
        if (!shouldInsertUser) return;

        // Insert user if it does not already exist
        let insertSql = 'INSERT INTO users SET ?';
        db.get().query(insertSql, user, (err, result) => {
            if (err) throw err;
            done(result.affectedRows);
        });
    }).catch((err) => {
        console.log(err);
    });
}