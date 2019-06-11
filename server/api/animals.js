const router = require('express').Router()
const {Animal} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    let animal = await Animal.findByPk(req.params.id)
    res.json(animal)
  } catch (error) {
    next(error)
  }
})
