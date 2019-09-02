const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 13;
const secretKey = '720Qu9|&r)/(uCOq!m:P)z*9bDS,2)_qYbLTY7EkAQQk_7ipRWZ2UZIZ1fu_fMya5azU2xd4VTD_aN8JeLum43LfxGUZ2Ye_73ed4M4nA71$h_7E3DH!M70r4d4Y_t34(H4m4NT0715h_73EDH1mF0R41!7ET1m3_0UYiML6xfHuuQ_gMAjwz56ubcBYg_vqt3sZfrVsPeqce_p39AtSBlDzXMPiMywdI_C~aKo-|N8jBfsIC..}g^Qo1f.=eR<V';

/**************
 * Get All Users
 */
exports.getUsers = (req, res, next) => {
    User.findAll({
        attributes: { exclude: ['password'] }
      }).then(users => {
        // delete users.password;
        res.send(users);
    }).catch(err => console.log(err));
};

/**************
 * Get User by ID
 */
exports.getUser = (req, res, next) => {
    User.findByPk(req.url.slice(1), {
        attributes: { exclude: ['password'] }
      }).then(user => {
        res.send(user.dataValues);
    }).catch(err => console.log(err));
};

/**************
 * Get Profile
 */
exports.getProfile = (req, res, next) => {
    User.findByPk(req.userData.userId, {
        attributes: { exclude: ['password'] }
      }).then(user => {
        res.send(user.dataValues);
    }).catch(err => console.log(err));
};

/**************
 * Create New User
 */
exports.createUser = (req, res, next) => {
    const params = req.body;
    bcrypt.hash(params.password, salt)
        .then(hash => {
            User.create({
                name: params.name || '',
                alias: params.alias || '',
                email: params.email,
                password: hash,
                verified: false,
                points: 0,
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
    if (req.body.password) {
        // Update Password
        bcrypt.hash(req.body.password, salt)
        .then(hash => {
            User.findByPk(req.userData.userId)
            .then(user => {
                user.password = hash;
                return user.save();
            }).then(result => res.send(result))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
        User.findByPk(req.userData.userId, {
            attributes: { exclude: ['password'] }
          })
        .then(user => {
            user.name = req.body.name || user.name;
            user.alias = req.body.alias || user.alias;
            user.email = req.body.email || user.email;
            user.verified = req.body.verified || user.verified;
            user.paid = req.body.paid || user.paid;
            return user.save();
        }).then(result => res.send(result))
        .catch(err => console.log(err));
    }
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

/**************
 * Validate & Create Token Upon Login
 */
exports.postLogin =  (req, res, next) => {
    let fetchedUser;
    User.findOne({ where: { email: req.body.email} })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Authentication failed."
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        }).then(result => {
            if(!result) {
                return res.status(401).json({
                    message: "Authentication failed."
                });
            }
            let token;
            if (fetchedUser.admin) {
                token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser.id, admin: true}, secretKey, { expiresIn: '1h' });
            } else {
                token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser.id}, secretKey, { expiresIn: '1h' });
            }
            
            res.status(200).json({ token, isAdmin: fetchedUser.admin });
        }).catch(err => {
            return res.status(401).json({
                message: "Authentication failed."
            });
        });
};