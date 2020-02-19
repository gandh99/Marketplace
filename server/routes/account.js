require('dotenv').config();
const express = require("express");
const router = express.Router();
const sql = require('../models/users');
const auth = require('../controllers/authenticate-controller');
const accountController = require('../controllers/account-controller');

router.post('/add-item', auth.authenticateToken, accountController.addItem);
router.get('/get-item', auth.authenticateToken, accountController.getItem);
router.delete('/delete-item', auth.authenticateToken, accountController.deleteItem);

module.exports = router;