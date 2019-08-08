const User = require('../models/user');
const bcrypt = require('bcrypt');

/**************
 * Get All Users
 */
exports.getUsers = (req, res, next) => {
    console.log('getUsers');
    User.findAll().then(users => {
        res.send(users);
    }).catch(err => console.log(err));
};

/**************
 * Get User by ID
 */
exports.getUser = (req, res, next) => {
    console.log('getUser');
    User.findByPk(req.url.slice(1)).then(user => {
        res.send(user.dataValues);
    }).catch(err => console.log(err));
};

/**************
 * Create New User
 */
exports.createUser = (req, res, next) => {
    console.log('createUser');
    const params = req.body;
    bcrypt.hash(params.password, 13)
        .then(hash => {
            console.log('Hashed Password');
            User.create({
                name: params.name || '',
                alias: params.alias || '',
                email: params.email,
                password: hash,
                verified: false,
                paid: false,
                admin: false,
            }).then(result => {
                res.status(201).json({
                    message: 'User Successfully Created.'
                });
            }).catch(err => console.log('User CreateUser: ', err));
        }).catch(err => console.log('BCrypt Error', err));
};

/**************
 * Update User by ID
 */
exports.updateUser = (req, res, next) => {
    console.log('updateUser');
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
    console.log('deleteUser');
    User.findByPk(req.url.slice(1))
    .then(user => {
        return user.destroy();
    })
    .then(result => {
        console.log('User Deleted');
    })
    .catch(err => console.log(err));
};
