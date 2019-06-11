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

router.get('/:id', async (req, res, next) => {
  try {
    let animal = await Animal.findByPk(req.params.id)
    res.json(animal)
  } catch (error) {
    next(error)
  }
})
