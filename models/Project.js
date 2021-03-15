const Sequelize = require('sequelize');
const db = require('../config/database'); 
// const Ticket = require('./Ticket');

const Project = db.define('project', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
});

// Project.associate = models => {
//     Project.hasMany(models.Ticket, {
//         foreignKey: "PROJECT-ID",
//         onDelete: "cascade"
//     });

//     Ticket.belongsTo(Project);
// }

// Project.hasMany(Ticket, {
//     foreignKey: "PROJECT-ID",
//     onDelete: "cascade"
// });

// Ticket.belongsTo(Project);


 

module.exports = Project;