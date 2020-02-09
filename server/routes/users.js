const express = require("express");
const router = express.Router();
const sql = require('../models/users');

// Login page
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    sql.loginUser(username, password, function done(result) {
        res.status(200).send(result);
    })
});

// Register page
router.post("/register", (req, res) => {
    const { username, password1, password2 } = req.body;
    sql.registerUser(username, password1, function done(result) {
        res.status(200).send(result);
    });
});

module.exports = router;