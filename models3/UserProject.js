const Sequelize = require('sequelize');
const db = require('../config/database'); 

const UserProject = db.define('UserProject', {
    userID: {
        type: Sequelize.INTEGER
    },
    projectID: {
        type: Sequelize.INTEGER
    }
});



 

module.exports = UserProject;