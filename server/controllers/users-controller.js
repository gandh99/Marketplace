require('dotenv').config();
const sql = require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res, done) => {console.log('hi')
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