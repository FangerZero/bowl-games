const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Game = sequelize.define('game', {
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
    teamScore1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    teamScore2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

module.exports = Game;