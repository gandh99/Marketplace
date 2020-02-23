require('dotenv').config();
const express = require("express");
const router = express.Router();
// const auth = require('../controllers/authenticate-controller');
const itemController = require('../controllers/item-controller');

router.get('/:category', itemController.getItem);

module.exports = router;