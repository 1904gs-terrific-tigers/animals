const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

//middleware to check that user is logged in
const isLoggedIn = (req, res, next) => {
  //if not logged in ; send error
  const user = req.user
  if (!user) {
    res.status(401).json({error: 'Must be logged in to do that.'})
    return
  }
  //if a user is logged in ; we're happy
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
    let [cart, created] = await Order.getCurrentOrderForUserId(req.user.id)

    const data = cart.animals
      ? cart.animals.map(animal => ({
          id: animal.id,
          name: animal.name,
          imageUrl: animal.imageUrl,
          timeUnit: animal.timeUnit,
          price: animal.price,
          quantity: animal.animalOrder.quantity
        }))
      : []
    res.json(data)
  } catch (error) {
    next(error)
  }
})

// adds item to cart
router.post('/:animalId', async (req, res, next) => {
  try {
    // gives us an order with only 1 animal
    // and the attached animalOrder with the correct quantity
    const [cart, created] = await Order.getCurrentOrderForUserId(req.user.id)
    await cart.addAnimalQuantity(+req.params.animalId, +req.body.quantity)
    res.sendStatus(204)
  } catch (error) {
    switch (error) {
      case Order.AnimalDoesNotExistError:
        res.status(400).json({error: Order.AnimalDoesNotExistError})
        break
      default:
        next(error)
    }
  }
})

// changes order to purchased
router.put('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const [order, created] = await Order.getCurrentOrderForUserId(userId)
    if (!order.animals || order.animals.length === 0) {
      return res.status(412).json({error: 'No items in cart.'})
    }
    order.set('purchased', true)
    await order.save()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//changes quantity in cart for given item
router.put('/:animalId', async (req, res, next) => {
  try {
    const userId = req.user.id
    const [order, created] = await Order.getCurrentOrderForUserId(userId)
    await order.setAnimalQuantity(+req.params.animalId, +req.body.quantity)
    res.sendStatus(204)
  } catch (error) {
    switch (error) {
      case Order.AnimalDoesNotExistError:
        res.status(400).json({error: Order.AnimalDoesNotExistError})
        break
      default:
        next(error)
    }
  }
})

// removes item from cart
router.delete('/:animalId', async (req, res, next) => {
  try {
    const userId = req.user.id
    const [order, created] = await Order.getCurrentOrderForUserId(userId)
    await order.deleteAnimalOrder(+req.params.animalId)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
