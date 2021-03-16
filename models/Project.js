const Sequelize = require('sequelize');
const db = require('../config/database'); 

const Project = db.define('project', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
});



 

module.exports = Project;