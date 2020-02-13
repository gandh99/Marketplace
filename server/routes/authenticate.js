require('dotenv').config();
const express = require("express");
const router = express.Router();
const auth = require('../controllers/authenticate-controller');

// Primarily used by load-account-menu.js on the client side
router.post('/', auth.authenticateToken, auth.authenticate);

module.exports = router;