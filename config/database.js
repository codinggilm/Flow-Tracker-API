// require('dotenv').config();
const { Sequelize } = require('sequelize');



// module.exports = new Sequelize('Flow-Tracker', 'postgres', 'millionpg1.', {
//     host: 'localhost',
//     dialect: 'postgres'
// })

module.exports = new Sequelize('db6ghsrh94fc1b', 'qshcgisolwmurs', '8b4130bea712a7cfe7eeba3c045a2d7ad16e174d943861aaf39fe0c3966e0597', {
    host: 'ec2-54-220-53-223.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    port: '5432',
    dialectOptions: {
        "ssl": {
            "require":true, 
            rejectUnauthorized: false
        }
    }
})