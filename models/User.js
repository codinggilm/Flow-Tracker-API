const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    },
    projectId: {
        type: Sequelize.STRING
    },
    ticketId: {
        type: Sequelize.STRING
    }
})
 

module.exports = User;