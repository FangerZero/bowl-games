const express = require('express');

const router = express.Router();
const notificationsController = require('../controllers/notifications');

router.get('/', notificationsController.getNotifications);
router.post('/', notificationsController.postNotifications);

module.exports = router;
