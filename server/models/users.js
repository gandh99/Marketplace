const db = require('../db');

module.exports.insertUser = function(username, password, done) {
    let user = { username: username, password: password };
    let sql = 'INSERT INTO users SET ?';
    db.get().query(sql, user, (err, result) => {
        if (err) throw err;
        done(result.affectedRows);
    });
}