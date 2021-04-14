// require('dotenv').config();
const { Sequelize } = require('sequelize');



// module.exports = new Sequelize('Flow-Tracker', 'postgres', 'millionpg1.', {
//     host: 'localhost',
//     dialect: 'postgres'
// })

module.exports = new Sequelize('dlgd7vjafs6qr', 'zgqltsnvzskwhm', 'c2bb4b6b4160af61d79e5d86df7228424cf2ff7b10a9775829302ce599eec6fd', {
    host: 'ec2-34-225-167-77.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: '5432',
    dialectOptions: {
        "ssl": {"require":true }
    }
})