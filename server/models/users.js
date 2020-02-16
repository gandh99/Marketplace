const db = require('../db');
const bcrypt = require("bcryptjs");

module.exports.registerUser = function (username, password, done) {
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
            resolve(true);
        });
    }).then((shouldInsertUser) => {
        if (!shouldInsertUser) return;

        // Hash password
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;

            // Set password to hash
            user.password = hash;

            // Insert user if it does not already exist
            let insertSql = 'INSERT INTO users SET ?';
            db.get().query(insertSql, user, (err, result) => {
                if (err) throw err;
                done('');   // could also be result.affectedRows
            });
        }));
    }).catch((err) => {
        console.log(err);
    });
}

module.exports.getUser = function (username, done) {
    let sql = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    db.get().query(sql, username, (err, result) => {
        if (err) throw err;
        done(result[0]);
    });
}

module.exports.getUserById = function (id) {
    let sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';
    db.get().query(sql, id, (err, result) => {
        if (err) throw err;
        done(result[0]);
    });
}