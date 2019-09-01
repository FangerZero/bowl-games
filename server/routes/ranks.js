const express = require('express');

const router = express.Router();
const ranksController = require('../controllers/ranks');

router.get('/set/rank', ranksController.setRanks);
router.get('/set/points', ranksController.setPoints);
router.get('/', ranksController.getRanks);

module.exports = router;
