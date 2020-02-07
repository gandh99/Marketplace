const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Login page


// Register page
router.get("/register", (req, res) => {
    res.send({
        id: 1,
        username: "lmao"
    });
});

module.exports = router;