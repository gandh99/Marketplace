const express = require("express");
const app = express();
const db = require('./db.js');
const session = require("express-session");
const passport = require("passport");

// Express session
app.use(session({
    // secret: process.env.SESSION_SECRET
    key: 'user_sid',
    secret: 'HELLO',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 60000,
    }
}));

// Passport config
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Connect to database
db.connect(db.MODE_TEST, (err) => {
    if (err) throw err;
    console.log("Connected to database...");
})

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', ['content-type', 'Authorization']);
    next();
});

// Bodyparser. Include limits because we want to receive large image data
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({limit: '50mb'}));

// Routes
app.use("/authenticate", require("./routes/authenticate"));
app.use("/users", require("./routes/users"));
app.use("/account", require("./routes/account"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port ${PORT}...`));