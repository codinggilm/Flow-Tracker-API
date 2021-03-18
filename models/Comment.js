const Sequelize = require('sequelize');
const db = require('../config/database'); 

const Comment = db.define('comment', {
    user: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    ticketId: {
        type: Sequelize.STRING
    },
    projectId: {
        type: Sequelize.STRING
    },
    project: {
        type: Sequelize.STRING
    }
});



 

module.exports = Comment;