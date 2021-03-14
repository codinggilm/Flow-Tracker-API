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

Project.associate = models => {
    Project.hasMany(models.Ticket, {
        onDelete: "cascade"
    });
}
 

module.exports = Project;