const express = require('express');

const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/', commentsController.createGame);
router.get('/:id', commentsController.getGame);
router.get('/', commentsController.getGames);
router.delete('/:id', commentsController.deleteGame);


module.exports = router;
