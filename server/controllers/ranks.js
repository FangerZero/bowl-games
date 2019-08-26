const Game = require('../models/game');
const User = require('../models/user');
const UserSelection = require('../models/userSelection');
const { Op } = require('sequelize');

/**************
 * Get All Ranks
 */
exports.setRanks = (req, res, next) => {
    UserSelection.findAll({
        attributes: ['userId','teamId'],
        include: [{
            model: Game,
            attributes: ['teamId1','teamId2','teamScore1','teamScore2', 'points'],
            where: {
                date: {
                   [Op.gt]: {[Op.col]: 'userSelection.updatedAt'},
                   [Op.lte]: new Date(new Date() - 4 * 60 * 60 * 1000),
                },
                [Op.or]: [{
                    [Op.and]: {
                        teamScore1: { [Op.gte]: {[Op.col]: 'teamscore2'} },
                        teamId1: { [Op.col]: 'userSelection.teamId' }
                    }
                }, {
                    [Op.and]: {
                        teamScore2: { [Op.gte]: {[Op.col]: 'teamscore1'} },
                        teamId2: { [Op.col]: 'userSelection.teamId' }
                    }
                }]
            }
        }],
        order: [
            ['userId', 'ASC']
        ],
    }).then(selections => {
        User.findAll({ attributes: ['id', 'alias', 'name']
        }).then(users => {
            let gameSelections = [];
            users.map(user => {
                let points = 0;
                name = user.alias || user.name;
                selections.map(selection => {
                    let data = selection.game.dataValues;
                    if (selection.userId === user.id) {
                        if (data.teamScore1 === data.teamScore2) {
                            points+= data.points/2;
                        } else {
                            points+= data.points;
                        }
                    }
                });
                gameSelections.push({ userId: user.id, name, points });
            });
            gameSelections.sort((a,b) => b.points - a.points);
            res.send(gameSelections);
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};
