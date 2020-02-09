const express = require("express");
const app = express();
const db = require('./db.js');
const session = require("express-session");
const passport = require("passport"); 

// Express session
app.use(session({
    // secret: process.env.SESSION_SECRET
    secret: 'HELLO',
    resave: false,
    saveUninitialized: false
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
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
});

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/users", require("./routes/users"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port ${PORT}...`));