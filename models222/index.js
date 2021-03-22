const database = require('../config/database');
const Sequelize = require("sequelize"); 


const db = {};

db.tutorials = require("./tutorial.model.js")(Sequelize);
db.comments = require("./comment.model.js")(Sequelize);


db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});

module.exports = db;