const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');

router.get('/:id', usersController.getUser);

router.patch('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

router.post('/', usersController.createUser);

router.get('/', usersController.getUsers);

module.exports = router;
