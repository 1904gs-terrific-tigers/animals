const router = require('express').Router()
const {Order} = require('../db/models')

// /api/orders
module.exports = router

//middleware to check that user is logged in
const isLoggedIn = (req, res, next) => {
  //if not logged in ; send error
  const user = req.user
  if (!user) {
    res.json({error: 'Must be logged in to do that.'})
    return
  }
  //if a user is logged in ; we're happy
  if (user) {
    next()
  }
}
router.use(isLoggedIn)

// get all purchased orders
router.get('/', async (req, res, next) => {
  try {
    //get cart from database
    let orders = await Order.getOrderHistoryForUserId(req.user.id)

    const data = orders.map(order => ({
      boughtOn: order.updatedAt,
      animals: order.animals.map(animal => ({
        id: animal.id,
        name: animal.name,
        imageUrl: animal.imageUrl,
        timeUnit: animal.timeUnit,
        price: animal.price,
        quantity: animal.animalOrder.quantity
      }))
    }))
    res.json(data)
  } catch (error) {
    next(error)
  }
})
