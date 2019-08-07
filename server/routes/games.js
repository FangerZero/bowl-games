const express = require('express');

const router = express.Router();
const gamesController = require('../controllers/games');

router.get('/:id', gamesController.getGame);

router.patch('/:id', gamesController.updateGame);

router.delete('/:id', gamesController.deleteGame);

router.post('/', gamesController.createGame);

router.get('/', gamesController.getGames);

module.exports = router;
