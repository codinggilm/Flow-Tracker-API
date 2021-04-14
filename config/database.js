// require('dotenv').config();
const { Sequelize } = require('sequelize');



module.exports = new Sequelize('Flow-Tracker', 'postgres', 'millionpg1.', {
    // host: 'localhost',
    // host: 'https://lit-woodland-91230.herokuapp.com',
    // port: process.env.PORT,
    dialect: 'postgres'
})