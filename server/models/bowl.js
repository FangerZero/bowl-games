const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Bowl = sequelize.define('bowl', {
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
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
});

module.exports = Bowl;