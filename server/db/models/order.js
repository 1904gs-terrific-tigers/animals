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
Order.AnimalDoesNotExistError = 'Animal does not exist.'
Order.OrderDoesNotExistError = 'Order does not exist.'

Order.prototype.toJSON = function() {
  return {
    id: this.id,
    boughtOn: this.updatedAt,
    animals: this.animals.map(animal => ({
      id: animal.id,
      name: animal.name,
      imageUrl: animal.imageUrl,
      timeUnit: animal.timeUnit,
      price: animal.price,
      quantity: animal.animalOrder.quantity
    }))
  }
}

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

Order.getOrderHistoryForUserId = userId => {
  return Order.findAll({
    where: {
      userId,
      purchased: true
    },
    include: [Animal]
  })
}

Order.getUserOrder = (userId, orderId) => {
  return Order.findOne({
    where: {
      purchased: true,
      userId,
      id: orderId
    },
    include: [Animal]
  })
}

Order.prototype.getHandlerToPurchase = function() {
  // error out if empty cart
  if (!this.animals || this.animals.length === 0) {
    return ['Cart cannot be empty if you are trying to purchase!', undefined]
  }
  //return a handler that will set the order to purchased if called
  return [
    undefined,
    () => {
      this.set('purchased', true)
      return this.save()
    }
  ]
}

Order.prototype.addAnimalQuantity = async function(animalId, quantity) {
  if (!isNumber(animalId)) {
    throw Order.AnimalDoesNotExistError
  }
  const animal = await Animal.findByPk(animalId)
  if (!animal) {
    throw Order.AnimalDoesNotExistError
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

//https://stackoverflow.com/questions/9716468
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

Order.prototype.setAnimalQuantity = async function(animalId, quantity) {
  if (!isNumber(animalId)) {
    throw Order.AnimalDoesNotExistError
  }
  const animal = await Animal.findByPk(animalId)
  if (!animal) {
    throw Order.AnimalDoesNotExistError
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
  //only change quantity if order already exists
  if (!created) {
    await cartItem.update({
      quantity: quantity
    })
  }
  return true
}

Order.prototype.deleteAnimalOrder = async function(animalId) {
  if (!isNumber(animalId)) {
    throw Order.AnimalDoesNotExistError
  }
  const animal = await Animal.findByPk(animalId)
  if (!animal) {
    throw Order.AnimalDoesNotExistError
  }
  await AnimalOrder.destroy({
    where: {
      animalId: animal.id,
      orderId: this.id
    }
  })
}

module.exports = Order
