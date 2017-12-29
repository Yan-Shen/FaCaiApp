const Sequelize = require('sequelize')
const db = require('../db')

const Account = db.define('account', {
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
  balanceCurrent: {
    type: Sequelize.FLOAT,
  },
  type: {
    type: Sequelize.STRING,
  },
  subtype: {
    type: Sequelize.STRING
  },
})

module.exports = Account;
