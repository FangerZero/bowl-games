const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    res.send('Get All Users');
};

exports.getUser = (req, res, next) => {
    res.send('Get User: ' + req.url.slice(1));
};

exports.createUser = (req, res, next) => {
    res.send('Post User');
};

exports.updateUser = (req, res, next) => {
    res.send('Update User:' + req.url.slice(1));
};

exports.deleteUser = (req, res, next) => {
    res.send('Delete User: ' + req.url.slice(1));
};