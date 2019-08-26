const express = require('express');

const router = express.Router();
const ranksController = require('../controllers/ranks');

router.get('/', ranksController.setRanks);

module.exports = router;
