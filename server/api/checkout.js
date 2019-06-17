const router = require('express').Router()
module.exports = router

const configureStripe = require('stripe')

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = configureStripe(STRIPE_SECRET_KEY)

const UserNotLoggedInError = new Error('Must be logged in to do that.')
const EmptyCartError = new Error('Must have items in cart to checkout')

//middleware to check that user is logged in
const isLoggedIn = (req, res, next) => {
  //if not logged in ; send error
  const user = req.user
  if (!user) {
    res.status(401).json({error: UserNotLoggedInError})
    return
  }
  //if a user is logged in ; we're happy
  if (user) {
    next()
  }
}

// so on checkout post, let's make sure they're logged in
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    // pull the user and order
    const userId = req.user.id
    const [order, created] = await Order.getCurrentOrderForUserId(userId)
    const [orderErr, orderSubmit] = order.getHandlerToPurchase()
    if (orderErr) {
      return res.status(400).json({error: orderErr})
    }
    // takes a callback with error and response
    stripe.charges.create(req.body, async (stripeErr, stripeRes) => {
      // on error, just send a 500, we're on fire
      if (stripeErr) {
        res.status(500).send({error: stripeErr})
      } else {
        await orderSubmit()
        res.status(200).send({success: stripeRes})
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
