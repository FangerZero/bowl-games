const Game = require('../models/game');

/**************
 * Get All Games
 */
exports.getGames = (req, res, next) => {
    Game.findAll().then(games => {
        res.send(games);
    }).catch(err => console.log(err));
};

/**************
 * Get Game by ID
 */
exports.getGame = (req, res, next) => {
    Game.findByPk(req.url.slice(1)).then(game => {
        res.send(game.dataValues);
    }).catch(err => console.log(err));
};

/**************
 * Create New Game
 */
exports.createGame = (req, res, next) => {
    const params = req.query;
    
    Game.create({
        bowlId: params.bowlId,
        teamId1: params.teamId1,
        teamId2: params.teamId2,
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
        game.bowlId = req.query.bowlId || game.bowlId;
        game.teamId1 = req.query.teamId1 || game.teamId1;
        game.teamId2 = req.query.teamId2 || game.teamId2;
        game.date = req.query.date || game.date;
        game.channel = req.query.channel || game.channel;
        game.points = req.query.points || game.points;
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