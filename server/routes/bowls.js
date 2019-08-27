const express = require('express');

const router = express.Router();
const bowlsController = require('../controllers/bowls');
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

router.get('/:id', bowlsController.getBowl);
router.get('/', bowlsController.getBowls);

router.post('/', checkAuth, checkAdmin, bowlsController.createBowl);

router.patch('/:id', checkAuth, checkAdmin, bowlsController.updateBowl);

router.delete('/:id', checkAuth, checkAdmin, bowlsController.deleteBowl);

module.exports = router;
