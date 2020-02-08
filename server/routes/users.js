const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const sql = require('../mysql/users');

// Login page


// Register page
router.post("/register", (req, res) => {
    console.log(req.body);
    const { username, password1, password2 } = req.body;
    sql.insertUser(username, password1);
    res.status(200);
    res.send('Registration successful');
    // res.send({
    //     id: 1,
    //     username: "lmao"
    // });
});

module.exports = router;