const Sequelize = require('sequelize');
const db = require('../config/database'); 


module.exports = (sequelize, DataTypes) => {
    const Tutorial = db.define("tutorial", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Tutorial;
};