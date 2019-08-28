const Game = require('../models/game');
const Bowl = require('../models/bowl');
const Team = require('../models/team');

/**************
 * Get All Games
 */
exports.getGames = (req, res, next) => {
    Game.findAll({ include: [{
        model: Bowl
    }, {
        model: Team,
        as: 'team1'
    }, {
        model: Team,
        as: 'team2'
    }] }).then(games => {
        res.send(games);
    }).catch(err => console.log(err));
    
};

/**************
 * Get Game by ID
 */
exports.getGame = (req, res, next) => {
    Game.findByPk(req.url.slice(1)).then(game => {
        let newGame = game.dataValues;
        Bowl.findByPk(game.bowlId).then(bowl => {
            newGame['bowlName'] = bowl.name;
        });
        Team.findByPk(game.teamId1).then(team => {
            newGame['team1Name'] = team.name;
        });
        Team.findByPk(game.teamId2).then(team => {
            newGame['team2Name'] = team.name;
            res.send(newGame);
        });
    }).catch(err => console.log(err));
};

/**************
 * Create New Game
 */
exports.createGame = (req, res, next) => {
    const params = req.body;
    
    Game.create({
        bowlId: params.bowlId,
        teamId1: params.teamId1,
        teamId2: params.teamId2,
        teamScore1: params.teamScore1,
        teamScore2: params.teamScore2,
        date: params.date,
        channel: params.channel,
        points: params.points,
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => console.log('Game CreateGame: ', err));
};

/**************
 * Update Game by ID
 */
exports.updateGame = (req, res, next) => {
    Game.findByPk(req.url.slice(1)).then(game => {
        game.bowlId = req.body.bowlId || game.bowlId;
        game.teamId1 = req.body.teamId1 || game.teamId1;
        game.teamId2 = req.body.teamId2 || game.teamId2;
        game.teamScore1 = req.body.teamScore1 || game.teamScore1;
        game.teamScore2 = req.body.teamScore2 || game.teamScore2;
        game.date = req.body.date || game.date;
        game.channel = req.body.channel || game.channel;
        game.points = req.body.points || game.points;
        return game.save();
    }).then(result => res.send(result))
    .catch(err => console.log(err));
};

/**************
 * Delete User by ID
 */
exports.deleteGame = (req, res, next) => {
    Game.findByPk(req.url.slice(1))
    .then(game => {
        return game.destroy();
    })
    .then(result => {
        console.log('Game Deleted');
    })
    .catch(err => console.log(err));
};