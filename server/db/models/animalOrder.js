const Sequelize = require('sequelize')
const db = require('../db')

const AnimalOrder = db.define(
  'animalOrder',
  {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1 //no negative quantities
      }
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['orderId', 'animalId']
      }
    ]
  }
)

module.exports = AnimalOrder
