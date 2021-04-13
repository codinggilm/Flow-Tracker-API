require('dotenv').config();
const { Sequelize } = require('sequelize');

module.exports = new Sequelize('Flow-Tracker', 'postgres', 'millionpg1.', {
    host: 'localhost',
    dialect: 'postgres'
})