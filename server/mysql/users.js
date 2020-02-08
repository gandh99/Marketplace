const db = require('./db');

function insertUser(username, password) {
    let user = { username: username, password: password };
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        return "User created";
    });
}

module.exports.insertUser = insertUser;