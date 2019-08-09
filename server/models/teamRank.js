const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const TeamRank = sequelize.define('teamRank', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    rank: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = TeamRank;