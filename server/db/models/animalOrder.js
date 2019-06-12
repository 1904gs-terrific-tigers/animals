const Sequelize = require('sequelize')
const db = require('../db')

const AnimalOrder = db.define('animalOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = AnimalOrder
