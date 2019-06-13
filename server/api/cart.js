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
    const data = cart.animals.map(animal => ({
      id: animal.id,
      name: animal.name,
      imageUrl: animal.imageUrl,
      timeUnit: animal.timeUnit,
      price: animal.price,
      quantity: animal.animalOrder.quantity
    }))
    res.json(data)
  } catch (error) {
    next(error)
  }
})

// adds item to cart
router.post('/:animalId', async (req, res, next) => {
  try {
    const userId = req.user.id
    // gives us an order with only 1 animal
    // and the attached animalOrder with the correct quantity
    const order = await Order.findOne({
      where: {
        userId,
        purchased: false
      },
      include: [
        {
          model: Animal,
          through: {
            where: {
              animalId: +req.params.animalId
            }
          }
        }
      ]
    })
    // this means animal does not exist in cart OR the database
    // we need to find out which one
    if (order.animals.length === 0) {
      // TODO fix this
      // assume we have an animal tho for now
      // const screw_the_linter = 1;
      // if (1 !== screw_the_linter) {
      //   return res.json({
      //     error: 'Animal does not seem to exist in our records.'
      //   })
      // }
      const animal = await Animal.findByPk(+req.params.animalId)
      order.addAnimal(animal, {
        through: {
          quantity: req.body.quantity,
          price: animal.price
        }
      })
    } else {
      // else, already in our cart and exists. just add more
      const animalOrder = order.animals[0].animalOrder
      const oldQuantity = animalOrder.quantity
      const incomingQuantity = req.body.quantity
      animalOrder.set('quantity', oldQuantity + incomingQuantity)
      await animalOrder.save()
    }

    res.sendStatus(202)
  } catch (error) {
    next(error)
  }
})

// changes order to purchased
router.put('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const order = await Order.findOne({
      where: {
        userId,
        purchased: false
      }
    })
    res.sendStatus(204)
    // order.set('purchased', true)
    // await order.save()
  } catch (error) {
    next(error)
  }
})

// // removes item from cart
// router.delete('/', async (req, res, next) => {
//   try {
//   } catch (error) {}
// })
