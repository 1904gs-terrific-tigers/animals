const router = require('express').Router()
const {Animal} = require('../db/models')
module.exports = router

//everything is hoisted on the /api/animals
router.get('/', async (req, res, next) => {
  try {
    const data = await Animal.findAll()
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})
