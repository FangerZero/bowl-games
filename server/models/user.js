const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    alias: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rank: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    points: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
    },
    verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    sub: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

});

module.exports = User;