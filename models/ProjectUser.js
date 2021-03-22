const Sequelize = require('sequelize');
const db = require('../config/database'); 

const ProjectUser = db.define('projectUser', {
    userID: {
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING
    },
    projectID: {
        type: Sequelize.INTEGER
    },
    project: {
        type: Sequelize.STRING
    }
});



 

module.exports = ProjectUser;