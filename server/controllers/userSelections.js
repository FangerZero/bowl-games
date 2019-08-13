const UserSelection = require('../models/userSelection');

/**************
 * Get All UserSelections
 */
exports.getUserSelections = (req, res, next) => {
    console.log(req);
    UserSelection.findAll().then(userSelections => {
        res.send(userSelections.dataValues);
    }).catch(err => console.log(err));
    /*
    const userId = req.originalUrl.split('/')[2];
    UserSelection.findAll({ where: { userId } }).then(userSelections => {
        res.send(userSelections);
    }).catch(err => console.log(err));*/
};

/**************
 * Get UserSelection by ID
 */
exports.getUserSelection = (req, res, next) => {
    UserSelection.findByPk(req.url.slice(1)).then(userSelection => {
        res.send(userSelection.dataValues);
    }).catch(err => console.log(err));
};

/**************
 * Create New UserSelection
 */
exports.createUserSelection = (req, res, next) => {
    const params = req.body;
    UserSelection.create({
        gameId: params.gameId,
        userId: params.userId,
        teamId: params.teamId,
    }).then(result => {
        res.status(201).json({
            message: 'UserSelection Successfully Created.'
        });
    }).catch(err => console.log('UserSelection CreateUserSelection: ', err));
};

/**************
 * Update UserSelection by ID
 */
exports.updateUserSelection = (req, res, next) => {
    UserSelection.findByPk(req.url.slice(1)).then(userSelection => {
        userSelection.gameId = req.body.gameId || userSelection.gameId;
        userSelection.userId = req.body.userId || userSelection.userId;
        userSelection.teamId = req.body.teamId || userSelection.teamId;
        return user.save();
    }).then(result => res.send(result))
    .catch(err => console.log(err));
};

/**************
 * Delete UserSelection by ID
 */
exports.deleteUserSelection = (req, res, next) => {
    UserSelection.findByPk(req.url.slice(1))
    .then(userSelection => {
        return userSelection.destroy();
    })
    .then(result => {
        console.log('UserSelection Selection Deleted');
    })
    .catch(err => console.log(err));
};
