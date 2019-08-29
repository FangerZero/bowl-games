const express = require('express');

const router = express.Router();
const ranksController = require('../controllers/ranks');

router.get('/set', ranksController.setRanks);
router.get('/', ranksController.getRanks);

module.exports = router;
