const Sequelize = require('sequelize')
const db = require('../db')
const Animal = require('./animal')

const Order = db.define('order', {
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Order.findCurrentOrderForUserId = id => {
  return Order.findOne({
    where: {
      userId: id,
      purchased: false
    },
    include: [Animal]
  })
}

module.exports = Order
