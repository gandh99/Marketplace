const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const sql = require('../models/users');

function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        // Get user in the form of an object
        let user;
        sql.getUser(username, (returnedUser) => {
            // Return if username was wrong (hence user does not exist)
            if (!returnedUser) {
                return done(null, false);
            }
            
            user = returnedUser;

            // Compare passwords if username exists
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    };

    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' },
        authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => done(null, sql.getUserById(id)));
}

module.exports = initialize;