const Sequelize = require('sequelize')
const db = require('../db')

const Token = db.define('token', {
  accessToken: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  itemId: {
    type: Sequelize.STRING,
    allowNull: false
  },

})

module.exports = Token;
