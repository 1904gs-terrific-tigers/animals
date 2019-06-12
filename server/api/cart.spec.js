/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {User, Order, AnimalOrder, Animal} = require('../db/models')

describe('Cart routes', () => {
  let dummyUser, dummyOrder, dummyAnimal

  beforeEach(async () => {
    await db.sync({force: true})

    const codysEmail = 'cody@puppybook.com'

    dummyUser = await User.create({
      email: codysEmail,
      password: '123'
    })

    dummyOrder = await dummyUser.createOrder({
      purchased: false
    })

    dummyAnimal = await Animal.create({
      name: 'Cody',
      species: 'sloth',
      price: 100
    })
  })

  describe('/api/cart/', () => {
    beforeEach(async () => {
      await dummyOrder.addAnimal(dummyAnimal, {
        through: {
          quantity: 10,
          price: dummyAnimal.price
        }
      })
    })

    it('GET /api/cart', async () => {
      const agent = request.agent(app)

      await agent.post('/auth/login').send({
        email: 'cody@puppybook.com',
        password: '123'
      })
      const res = await agent.get('/api/cart').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].id).to.equal(dummyAnimal.id) //first elem in array is animal obj
      expect(res.body[0].name).to.equal(dummyAnimal.name)
      expect(res.body[0].imageUrl).to.equal(dummyAnimal.imageUrl)
      expect(res.body[0].timeUnit).to.equal(dummyAnimal.timeUnit)
      expect(res.body[0].price).to.equal(dummyAnimal.price)
      expect(res.body[0].quantity).to.equal(10)
    })
  }) // end describe('/api/cart')
}) // end describe('Car routes')
