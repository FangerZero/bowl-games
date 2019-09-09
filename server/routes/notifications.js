const express = require('express');

const router = express.Router();
const notificationsController = require('../controllers/notifications');
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

router.post('/ranks', checkAuth, checkAdmin, notificationsController.sendRankNotif);

module.exports = router;
