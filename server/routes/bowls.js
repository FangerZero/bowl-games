const express = require('express');

const router = express.Router();
const bowlsController = require('../controllers/bowls');

router.get('/:id', bowlsController.getBowl);
router.get('/', bowlsController.getBowls);

router.patch('/:id', bowlsController.updateBowl);

router.delete('/:id', bowlsController.deleteBowl);

router.post('/', bowlsController.createBowl);

module.exports = router;
