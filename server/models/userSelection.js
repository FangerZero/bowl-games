const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserSelection = sequelize.define('userSelection', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = UserSelection;