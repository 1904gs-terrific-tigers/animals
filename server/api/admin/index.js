const {Animal} = require('../../db/models')

const router = require('express').Router()
module.exports = router

// user is logged in and authenticated already
// /api/admin/

router.get('/', (req, res, next) => {
  res.sendStatus(200)
})

router.post('/animal', async (req, res, next) => {
  try {
    const animal = await Animal.create(req.body)
    res.status(201).json(animal)
  } catch (error) {
    next(error)
  }
})

router.put('/animal/:animalId', async (req, res, next) => {
  try {
    await Animal.update(req.body, {
      where: {
        id: req.params.animalId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
