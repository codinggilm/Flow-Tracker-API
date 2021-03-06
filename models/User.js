const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    company: {
        type: Sequelize.STRING
    },
    companyId: {
        type: Sequelize.STRING
    },
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
    }
})
 

module.exports = User;