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

// Routes
app.use("/users", require("./routes/users"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port ${PORT}...`));