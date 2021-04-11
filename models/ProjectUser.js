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
    },
    role: {
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING
    },
    companyId: {
        type: Sequelize.INTEGER
    }
});



 

module.exports = ProjectUser;