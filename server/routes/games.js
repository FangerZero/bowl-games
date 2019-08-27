const express = require('express');

const router = express.Router();
const gamesController = require('../controllers/games');
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

router.get('/:id', gamesController.getGame);
router.get('/', gamesController.getGames);

router.post('/', checkAuth, checkAdmin, gamesController.createGame);

router.patch('/:id', checkAuth, checkAdmin, gamesController.updateGame);

router.delete('/:id', checkAuth, checkAdmin, gamesController.deleteGame);

module.exports = router;
