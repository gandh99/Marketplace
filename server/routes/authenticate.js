require('dotenv').config();
const express = require("express");
const router = express.Router();
const authenticateController = require('../controllers/authenticate-controller');

// Primarily used by load-account-menu.js on the client side
router.post('/', authenticateController.authenticateToken, authenticateController.authenticate);

module.exports = router;