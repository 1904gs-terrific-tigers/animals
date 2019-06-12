const router = require('express').Router()
const {Order, AnimalOrder, Animal} = require('../db/models')
module.exports = router

//middleware to check that user is logged in
const isLoggedIn = (req, res, next) => {
  //if not logged in ; send error
  const user = req.user
  if (!user) {
    res.json({error: 'Must be logged in to do that.'})
    return
  }
  //if a user is logged in ; we're happy ; keep going
  if (user) {
    next()
  }
}
router.use(isLoggedIn)

// routes start with /api/cart

// gets full cart
router.get('/', async (req, res, next) => {
  try {
    //get cart from database
    let cart = await Order.findOne({
      where: {
        userId: req.user.id,
        purchased: false
      },
      include: [Animal]
    })
    res.json(cart.animals)
  } catch (error) {
    next(error)
  }
})

// // changes order to purchased
// router.put('/', async (req, res, next) => {
//   try {
//   } catch (error) {}
// })

// // adds item to cart
// router.post('/:animalid', async (req, res, next) => {
//   try {
//   } catch (error) {}
// })

// // removes item from cart
// router.delete('/', async (req, res, next) => {
//   try {
//   } catch (error) {}
// })
