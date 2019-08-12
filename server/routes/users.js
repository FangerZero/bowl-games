const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

// Order Does Matter
router.get('/:id', checkAuth, usersController.getUser);
router.get('/', checkAuth, usersController.getUsers);

router.patch('/:id', checkAuth, usersController.updateUser);

router.delete('/:id', checkAuth, usersController.deleteUser);

router.post('/login', usersController.postLogin);
router.post('/', usersController.createUser);

module.exports = router;
