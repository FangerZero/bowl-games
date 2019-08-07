const express = require('express');

const router = express.Router();
const teamsController = require('../controllers/teams');

router.get('/:id', teamsController.getTeam);

router.patch('/:id', teamsController.updateTeam);

router.delete('/:id', teamsController.deleteTeam);

router.post('/', teamsController.createTeam);

router.get('/', teamsController.getTeams);

module.exports = router;
