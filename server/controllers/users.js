const User = require('../models/user');

/**************
 * Get All Users
 */
exports.getUsers = (req, res, next) => {
    User.findAll().then(users => {
        res.send(users);
    }).catch(err => console.log(err));
};

/**************
 * Get User by ID
 */
exports.getUser = (req, res, next) => {
    User.findByPk(req.url.slice(1)).then(user => {
        res.send(user.dataValues);
    }).catch(err => console.log(err));
};

/**************
 * Create New User
 */
exports.createUser = (req, res, next) => {
    const params = req.query;
    
    User.create({
        name: params.name,
        alias: params.alias || '',
        email: params.email,
        password: params.password,
        verified: false,
        paid: false,
        admin: false,
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => console.log('User CreateUser: ', err));
};

/**************
 * Update User by ID
 */
exports.updateUser = (req, res, next) => {
    User.findByPk(req.url.slice(1)).then(user => {
        user.name = req.query.name || user.name;
        user.alias = req.query.alias || user.alias;
        user.email = req.query.email || user.email;
        user.password = req.query.password || user.password;
        user.verified = req.query.verified || user.verified;
        user.paid = req.query.paid || user.paid;
        return user.save();
    }).then(result => res.send(result))
    .catch(err => console.log(err));
};

/**************
 * Delete User by ID
 */
exports.deleteUser = (req, res, next) => {
    User.findByPk(req.url.slice(1))
    .then(user => {
        return user.destroy();
    })
    .then(result => {
        console.log('User Deleted');
    })
    .catch(err => console.log(err));
};