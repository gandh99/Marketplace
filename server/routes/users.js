const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const sql = require('../models/users');

// Login page


// Register page
router.post("/register", (req, res) => {
    const { username, password1, password2 } = req.body;
    sql.insertUser(username, password1, function done(rows) {
        res.status(200).json(rows);
    });
});

module.exports = router;