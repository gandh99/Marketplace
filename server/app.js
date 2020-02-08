const express = require("express");
const app = express();
const mysql = require('mysql');

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
});

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// Create MySQL database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE marketplace';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Databased created.');
    });
});

// Create table
app.get('/createuserstable', (req, res) => {
    
});

// Routes
app.use("/users", require("./routes/users"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port ${PORT}...`));