const Team = require('../models/team');

/**************
 * Get All Teams
 */
exports.getTeams = (req, res, next) => {
    Team.findAll().then(teams => {
        res.send(teams);
    }).catch(err => console.log(err));
};

/**************
 * Get Team by ID
 */
exports.getTeam = (req, res, next) => {
    Team.findByPk(req.url.slice(1)).then(team => {
        res.send(team.dataValues);
    }).catch(err => console.log(err));
};

/**************
 * Create New Team
 */
exports.createTeam = (req, res, next) => {
    const params = req.body;
    
    Team.create({
        name: params.name,
        city: params.city,
        state: params.state,
        rank: params.rank,
        mascot: params.mascot,
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => console.log('Team CreateTeam: ', err));
};

/**************
 * Update Team by ID
 */
exports.updateTeam = (req, res, next) => {
    Team.findByPk(req.url.slice(1)).then(team => {
        team.name = req.body.name || team.name;
        team.city = req.body.city || team.city;
        team.state = req.body.state || team.state;
        team.rank = req.body.rank || team.rank;
        team.mascot = req.body.mascot || team.mascot;
        return team.save();
    }).then(result => res.send(result))
    .catch(err => console.log(err));
};

/**************
 * Delete User by ID
 */
exports.deleteTeam = (req, res, next) => {
    Team.findByPk(req.url.slice(1))
    .then(team => {
        return team.destroy();
    })
    .then(result => {
        console.log('Team Deleted');
    })
    .catch(err => console.log(err));
};