const Sequelize = require('sequelize');
const db = require('../config/database');

const Ticket = db.define('ticket', {
    title: {
        type: Sequelize.STRING
    },
    project: {
        type: Sequelize.STRING
    },
    projectId: { 
        type: Sequelize.STRING
    },
    developer: {
        type: Sequelize.STRING
    },
    developerId: {
        type: Sequelize.INTEGER
    },
    priority: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    submitter: {
        type: Sequelize.STRING
    },
    companyId: {
        type: Sequelize.INTEGER
    }
})


module.exports = Ticket;