require('dotenv').config();
const express = require("express");
const router = express.Router();
const sql = require('../models/users');
const auth = require('../controllers/authenticate-controller');
const accountController = require('../controllers/account-controller');

router.post('/add-item', auth.authenticateToken, accountController.addItem);

module.exports = router;