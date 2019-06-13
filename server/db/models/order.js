const Sequelize = require('sequelize')
const db = require('../db')
const Animal = require('./animal')
const AnimalOrder = require('./animalOrder')

const Order = db.define('order', {
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})
Order.AnimalDoesNotExistError = new Error('Animal does not exist.')

// returns an array of [order, newlyCreated]
// this will create an order for the user if one does not exist
Order.getCurrentOrderForUserId = userId => {
  return Order.findOrCreate({
    where: {
      userId,
      purchased: false
    },
    include: [Animal],
    defaults: {
      userId,
      purchased: false
    }
  })
}

Order.prototype.addAnimalQuantity = async function(animalId, quantity) {
  const animal = await Animal.findByPk(animalId)
  if (!animal) {
    throw AnimalDoesNotExistError
  }
  const [cartItem, created] = await AnimalOrder.findOrCreate({
    where: {
      animalId: animal.id,
      orderId: this.id
    },
    defaults: {
      animalId: animal.id,
      orderId: this.id,
      price: animal.price,
      quantity: quantity
    }
  })
  // if we didn't create, we want to increment
  if (!created) {
    await cartItem.update({
      price: animal.price,
      quantity: cartItem.quantity + quantity
    })
  }
  return true
}

Order.prototype.setAnimalQuantity = (animalId, quantity) => {}

module.exports = Order
