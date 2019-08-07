const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    bowlId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    teamId1: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    teamId2: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    channel: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    points: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = User;