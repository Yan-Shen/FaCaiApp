const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  amount: {
    type: Sequelize.FLOAT,
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  categoryId: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = Transaction;
