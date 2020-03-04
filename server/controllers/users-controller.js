require('dotenv').config();
const sql = require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

module.exports.login = (req, res, done) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.status(401).send('Invalid username/password');
        } else {
            let tokenData = {
                username: user.username
            }
            const accessToken = jwt.sign({ tokenData }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '0.5h' });
            const refreshToken = jwt.sign({ tokenData }, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
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

module.exports.token = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        res.status(401).send();
    }
    if (!refreshTokens.includes(refreshToken)) {
        res.status(403).send();
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        const accessToken = jwt.sign({ name: user.tokenData }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '0.5h' });
        res.json({ accessToken: accessToken});
    })
}