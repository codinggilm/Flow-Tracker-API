const Sequelize = require('sequelize');
const db = require('../config/database');
// const Project = require('./Project'); 

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
    comment: {
        type: Sequelize.STRING
    }
})

// Ticket.associate = models => {
//     Ticket.belongsTo(models.Project, {
//         foreignKey: {
//             allowNull: false
//         }
//     });
// }

// Ticket.belongsTo(models.Project);
 

module.exports = Ticket;