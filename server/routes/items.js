require('dotenv').config();
const express = require("express");
const router = express.Router();
const auth = require('../controllers/authenticate-controller');
const itemController = require('../controllers/item-controller');

router.get('/category/:category', itemController.getActiveItems);
router.post('/buy', auth.authenticateToken, itemController.buyItem);
router.get('/history', auth.authenticateToken, itemController.getTransactedItems);

module.exports = router;