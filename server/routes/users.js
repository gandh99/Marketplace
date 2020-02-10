require('dotenv').config();
const express = require("express");
const router = express.Router();
const sql = require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Login page
router.post('/login', (req, res, done) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.status(401).send('Invalid username/password');
        } else {
            const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET); 
            res.status(200).send(accessToken);
        }
    })(req, res, done);
});

// Register page
router.post("/register", (req, res) => {
    const { username, password1, password2 } = req.body;
    if (!username || !password1 || !password2) {
        res.status(400).send('Missing input fields.');
        return;
    }
    sql.registerUser(username, password1, function done(result) {
        res.status(200).send(result);
    });
});

module.exports = router;