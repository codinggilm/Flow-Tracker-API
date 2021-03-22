const Sequelize = require('sequelize');
const db = require('../config/database'); 

const Project = db.define('Project', {
    title: {
        type: Sequelize.STRING
    }
});


 
 

module.exports = Project;