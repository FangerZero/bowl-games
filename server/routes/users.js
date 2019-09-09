const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');
const checkAuth = require('../middleware/check-auth');

// Order Does Matter
router.get('/recover', usersController.getPassword);
router.get('/profile', checkAuth, usersController.getProfile);
router.get('/:id', checkAuth, usersController.getUser);
router.get('/', checkAuth, usersController.getUsers);

router.patch('/sub', checkAuth, usersController.updateSub);
router.patch('/:id', checkAuth, usersController.updateUser);
router.patch('/', checkAuth, usersController.updateUser);

router.delete('/:id', checkAuth, usersController.deleteUser);

router.post('/login', usersController.postLogin);
router.post('/', usersController.createUser);

module.exports = router;
