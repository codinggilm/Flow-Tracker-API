const Sequelize = require('sequelize');
const db = require('../config/database'); 

module.exports = (sequelize, DataTypes) => {
    const Comment = db.define("comment", {
      name: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      }
    });
  
    return Comment;
};