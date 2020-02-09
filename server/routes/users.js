const express = require("express");
const router = express.Router();
const sql = require('../models/users');

// Login page


// Register page
router.post("/register", (req, res) => {
    const { username, password1, password2 } = req.body;
    sql.insertUser(username, password1, function done(result) {
        res.status(200).send(result);
    });
});

module.exports = router;