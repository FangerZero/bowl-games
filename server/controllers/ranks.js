const Game = require('../models/game');
const User = require('../models/user');
const UserSelection = require('../models/userSelection');
const { Op } = require('sequelize');


exports.getRanks = (req, res, next) => {
    User.findAll({
        attributes: { includ: ['alias', 'name', 'points', 'rank'], exclude: ['password'] },
        order: [
            ['points', 'DESC']
        ]
    }).then(users => {
        users.forEach(user => {
            user.name = user.alias !== '' ? user.alias : user.name;
        });
        res.send(users);
    }).catch(err => console.log(err));
};

/**************
 * Set All Ranks
 */
exports.setRanks = (req, res, next) => {
    User.findAll({
        attributes: ['id', 'rank', 'points'],
        order: [
            ['points', 'DESC']
        ]
    }).then(users => {
        let rank = 0;
        let sameRank = [];
        users.map((user, index) => {
            rank++;
            if (!users[index+1] || user.points > users[index+1].points) {
                if (+user.points === 0) {
                    users[index].rank = `0`;
                } else {
                    users[index].rank = `${rank}`;
                    if (sameRank.length) {
                        sameRank.map(sri => {
                            users[sri].rank = `${rank}`;
                        });
                        sameRank = [];
                    }
                }
            } else {
                sameRank.push(index);
            }
        });
        return users;
    }).then(users => {
        users.forEach(user => {
            return user.save();
        });
        res.status(201).json({
            message: 'User Ranks Updated'
        });
    }).catch(err => console.log(err));
};

/**************
 * Set All Points
 */
exports.setPoints = (req, res, next) => {
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
        let id = '';
        let points = 0;
        selections.map((selection, index) => {
            let data = selection.game.dataValues;
            // First round
            if (id === '') {
                id = selection.userId;
            }
            
            if (id !== selection.userId) {
                User.findByPk(id, {
                    attributes: { exclude: ['password'] }
                  })
                .then(user => {
                    // Need to add Points to Table, and move the "rank" to points and put rank in rank. 
                    user.points = points;
                    return user.save();
                }).catch(err => console.log(err));

                id = selection.userId;
                points = 0;
            }
            
            if (data.teamScore1 === data.teamScore2) {
                points+= data.points/2;
            } else {
                points+= data.points;
            }

            if(selections.length === index+1) {
                User.findByPk(id, {
                    attributes: { exclude: ['password'] }
                  })
                .then(user => {
                    user.points = points;
                    return user.save();
                }).catch(err => console.log(err));
            }
        });
        res.status(201).json({
            message: 'User Points Updated'
        });
    }).catch(err => console.log(err));
};
