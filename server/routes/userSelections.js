const express = require('express');

const router = express.Router();
const usersController = require('../controllers/userSelections');
const checkAuth = require('../middleware/check-auth');

// Order Does Matter
router.get('/:id', checkAuth, usersController.getUserSelection);
router.get('/', checkAuth, usersController.getUserSelections);

router.patch('/', checkAuth, usersController.updateUserSelection);

router.delete('/', checkAuth, usersController.deleteUserSelection);

router.post('/', checkAuth, usersController.createUserSelection);

module.exports = router;
