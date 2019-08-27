const express = require('express');

const router = express.Router();
const teamsController = require('../controllers/teams');
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

router.get('/:id', teamsController.getTeam);
router.get('/', teamsController.getTeams);

router.post('/', checkAuth, checkAdmin, teamsController.createTeam);

router.patch('/:id', checkAuth, checkAdmin, teamsController.updateTeam);

router.delete('/:id', checkAuth, checkAdmin, teamsController.deleteTeam);

module.exports = router;
