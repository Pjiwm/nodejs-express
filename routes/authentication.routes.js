const express = require('express');
const router = express.Router();
const controller = require('../controllers/authentication.controller');

router.get('/info', controller.getInfo);

module.exports = router;