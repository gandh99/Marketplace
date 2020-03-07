require('dotenv').config();
const sql = require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const redis = require('redis');

// Start Redis client
const REDIS_PORT = process.env.PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);

module.exports.login = (req, res, done) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.status(401).send('Invalid username/password');
        } else {
            let tokenData = {
                username: user.username
            }
            // Create the access token and refresh token
            const accessToken = jwt.sign({ tokenData }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ tokenData }, process.env.REFRESH_TOKEN_SECRET);

            // Store the refresh token in Redis cache
            redisClient.set(user.username, refreshToken);

            // Send the 2 tokens back
            res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken, token:tokenData });
        }
    })(req, res, done);
};

module.exports.register = (req, res) => {
    const { username, password1, password2 } = req.body;
    if (!username || !password1 || !password2) {
        res.status(400).send('Missing input fields.');
        return;
    }
    sql.registerUser(username, password1, function done(result) {
        res.status(200).send(result);
    });
};

// Accepts a refresh token and uses it to generate and return a new access token
module.exports.token = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        res.status(400).send('Missing refresh token.');
        return;
    }
    if (!redisClient.get(req.body.username)) {
        res.sendStatus(401);
        return;
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        let tokenData = {
            username: user.tokenData.username
        }
        const accessToken = jwt.sign({ tokenData }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.status(200).send({ accessToken: accessToken });
    })
}