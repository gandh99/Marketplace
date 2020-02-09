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
            const accessToken = jwt.sign(user.id, 'SECRET');   //use env instead of SECRET later on 
            res.status(200).send(accessToken);
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