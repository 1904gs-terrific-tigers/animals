const router = require('express').Router()
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
const isAdmin = (req, res, next) => {
  const user = req.user
  if (!user.isAdmin) {
    res
      .status(401)
      .json({error: 'You need the proper permissions to access this page'})
    return
  }
  next()
}

router.use('/users', require('./users'))
router.use('/animals', require('./animals'))
router.use('/cart', require('./cart'))
router.use('/orders', require('./order'))

router.use((req, res, next) => {
  error.status = 404
  next(error)
})
