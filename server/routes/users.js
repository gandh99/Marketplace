require('dotenv').config();
const express = require("express");
const router = express.Router();
const sql = require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, done) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user.tokenData;   // user.tokenData because we sign jwt with {user} instead of JSON.stringify(user)
        done();
    });
}

// Primarily used by load-account-menu.js on the client side
router.post('/authenticate', authenticateToken, (req, res, done) => {
    res.status(200).send(req.user.username);
});

// Login page
router.post('/login', (req, res, done) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.status(401).send('Invalid username/password');
        } else {
            let tokenData = {
                username: user.username
            }
            const accessToken = jwt.sign({ tokenData }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '0.25h' });
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