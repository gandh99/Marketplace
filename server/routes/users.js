const express = require("express");
const router = express.Router();
const sql = require('../models/users');
const passport = require('passport');

// Login page
router.post('/login', (req, res, done) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.status(200).send('Invalid username/password');
        } else {
            res.status(200).send('');
        }
    })(req, res, done);
});

// Register page
router.post("/register", (req, res) => {
    const { username, password1, password2 } = req.body;
    sql.registerUser(username, password1, function done(result) {
        res.status(200).send(result);
    });
});

module.exports = router;