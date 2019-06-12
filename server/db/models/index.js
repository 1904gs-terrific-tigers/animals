const User = require('./user')
const Animal = require('./animal')
const AnimalOrder = require('./animalOrder')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Animal.belongsToMany(Order, {through: AnimalOrder})
Order.belongsToMany(Animal, {through: AnimalOrder})

User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Animal,
  Order,
  AnimalOrder
}
