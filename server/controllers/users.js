const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 13;
const generator = require('generate-password');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

    User.findOne({
        attributes: ['email'],
        where: {
            email: params.email
          }
      })
    .then(user => {
        if(!user) {
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
        } else {
            res.status(409).json({
                message: 'There was an issue.'
            });
        }
    }).catch(err => console.log(err));
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
 * Update User Sub by ID
 */
exports.updateSub = (req, res, next) => {
    User.findByPk(req.userData.userId, {
        attributes: { exclude: ['password'] }
      })
    .then(user => {
        user.sub = req.body || user.sub;
        return user.save();
    }).then(result => res.send(result))
    .catch(err => console.log(err));
};
exports.removeSub = (req, res, next) => {
    User.findByPk(req.userData.userId, {
        attributes: { exclude: ['password'] }
      })
    .then(user => {
        user.sub = null;
        return user.save();
    }).then(result => res.send(result))
    .catch(err => console.log(err));
};


/**************
 * Generate New Password
 */
exports.getPassword = (req, res, next) => {
    const password = generator.generate({
        length: 10,
        numbers: true
    });
    console.log('new password: ', password);

    bcrypt.hash(password, salt)
    .then(hash => {
        User.findOne({
            where: {
                email: req.body.email
              }
          })
        .then(user => {
            if(user) {
                user.password = hash;

                const output = `
                <h3>New Password Request</h3>
                <p>
                Here is your new password you requested <b>${password}</b>
                </p>`;
                /*
                let transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });
            
                // user.dataValues.email
                let mailOptions = {
                    from: `"Bowl Games Support" ${process.env.EMAIL}`,
                    to: user.email,
                    subject: `Bowl Games Password Recovery`,
                    text: 'This email is from the support form',
                    html: output
                };
            
                transporter.sendMail(mailOptions)
                .then(response => {
                    console.log('trans', response);
                    res.send('Email has been sent');
                }).catch(err => console.log('error', err));
                */
                //return user.save();
            }
        }).catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

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
                token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser.id, admin: true}, process.env.AUTH_KEY, { expiresIn: '1h' });
            } else {
                token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser.id}, process.env.AUTH_KEY, { expiresIn: '1h' });
            }
            
            res.status(200).json({ token, isAdmin: fetchedUser.admin });
        }).catch(err => {
            return res.status(401).json({
                message: "Authentication failed."
            });
        });
};