require('dotenv').config();
const express = require("express");
const router = express.Router();
const auth = require('../controllers/authenticate-controller');
const itemController = require('../controllers/item-controller');

router.get('/:category', itemController.getItem);
router.post('/buy', auth.authenticateToken, itemController.buyItem);

module.exports = router;