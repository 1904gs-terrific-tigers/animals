const router = require('express').Router()
module.exports = router

const configureStripe = require('stripe')

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = configureStripe(STRIPE_SECRET_KEY)

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log(stripeErr)
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
  }
}

router.get('/', (req, res) => {
  res.send({
    message: 'Hello Stripe checkout server!',
    timestamp: new Date().toISOString()
  })
})

router.post('/', (req, res) => {
  console.log('incoming data:', req.body)
  stripe.charges.create(req.body, postStripeCharge(res))
})

module.exports = router
