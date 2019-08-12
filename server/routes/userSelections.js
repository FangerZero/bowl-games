const express = require('express');

const router = express.Router();
const usersController = require('../controllers/userSelections');
// const checkAuth = require('../middleware/check-auth');

// Order Does Matter
router.get('/:id', usersController.getUserSelection);
router.get('/', usersController.getUserSelections);

router.patch('/:id', usersController.updateUserSelection);

router.delete('/:id', usersController.deleteUserSelection);

router.post('/', usersController.createUserSelection);

module.exports = router;
