const express = require('express');

const router = express.Router();
const supportController = require('../controllers/support');

router.post('/send', supportController.send);

module.exports = router;
