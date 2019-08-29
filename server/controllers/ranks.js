const Game = require('../models/game');
const User = require('../models/user');
const UserSelection = require('../models/userSelection');
const { Op } = require('sequelize');


exports.getRanks = (req, res, next) => {
    User.findAll({
        attributes: { exclude: ['password'] },
        order: [
            ['rank', 'DESC']
        ]
    }).then(results => {
        let rank = 1;
        let sameRank = [];
        let retVal = [];
        results.map((result, index) => {
            // Need to add Points to Table, and move the "rank" to points and put rank in rank. 
            if (!results[index+1] || result.rank > results[index+1].rank) {
                retVal.push({ name: result.alias || result.name, points: results[index].rank, rank});
                if (sameRank.length) {
                    sameRank.map(sri => {
                        retVal.push({ name: results[sri].alias || results[sri].name, points: results[sri].rank, rank});
                    });
                    sameRank = [];
                }
            } else {
                sameRank.push(index);
            }
            rank++;
        });
        res.send(retVal);
    }).catch(err => console.log(err));
};

/**************
 * Set All Ranks
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
                    user.rank = points;
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
                    user.rank = points;
                    return user.save();
                }).catch(err => console.log(err));
            }
        });
        res.send('User Ranks Updated');
        /*
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
        */
    }).catch(err => console.log(err));
};
