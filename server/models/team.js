const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Team = sequelize.define('team', {
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
    city: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    state: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    rank: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    mascot: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

module.exports = Team;