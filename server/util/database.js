const Sequelize = require('sequelize');

const sequelize = new Sequelize('bowl_games', 'kplageman', 'password', {
    dialect: 'mysql',
    host: process.env.host,
    port: 3306,
});

module.exports = sequelize;
