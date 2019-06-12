const Sequelize = require('sequelize')
const db = require('../db')

const Animal = db.define('animal', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  description: {
    type: Sequelize.TEXT
  },
  species: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //number of minutes
  timeUnit: {
    type: Sequelize.INTEGER,
    defaultValue: 60
  },
  // price is in dollars
  pricePerTimeUnit: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Animal
