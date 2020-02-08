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

// MySQL
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Routes
app.use("/users", require("./routes/users"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port ${PORT}...`));