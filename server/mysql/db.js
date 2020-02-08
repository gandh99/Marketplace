const mysql = require('mysql');

// Connect to MySQL
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'marketplace'
});
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

module.exports = db;

// // Insert dummy user into users table
// app.get('/insertuser', (req, res) => {
//     let user = {username: 'john', password: 'password1'};
//     let sql = 'INSERT INTO users SET ?';
//     let query = db.query(sql, user, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('User added.');
//     });
// });

// // Get individual user from users table
// app.get('/user/:id', (req, res) => {
//     let sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send('User fetched.');
//     });
// });

