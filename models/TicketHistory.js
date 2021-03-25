const Sequelize = require('sequelize');
const db = require('../config/database'); 

const TicketHistory = db.define('ticketHistory', {
    property: {
        type: Sequelize.STRING
    },
    oldValue: {
        type: Sequelize.STRING
    },
    newValue: {
        type: Sequelize.STRING
    },
    ticketId: {
        type: Sequelize.INTEGER
    }
});



 

module.exports = TicketHistory;