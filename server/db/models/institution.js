const Sequelize = require('sequelize')
const db = require('../db')

const Institution = db.define('institution', {
  id: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

})

module.exports = Institution;
