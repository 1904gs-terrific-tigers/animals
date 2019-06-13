/* eslint-disable no-unused-expressions */
/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {User, Order, AnimalOrder, Animal} = require('../db/models')

describe('Cart routes', () => {
  let dummyUser, dummyOrder, cody

  let userSignIn = {
    email: 'cody@puppybook.com',
    password: '123'
  }

  beforeEach(async () => {
    await db.sync({force: true})

    dummyUser = await User.create(userSignIn)

    dummyOrder = await dummyUser.createOrder({
      purchased: false
    })

    cody = await Animal.create({
      name: 'Cody',
      species: 'sloth',
      price: 100
    })
  })

  describe('/api/cart/', () => {
    beforeEach(async () => {
      await dummyOrder.addAnimal(cody, {
        through: {
          quantity: 10,
          price: cody.price
        }
      })
    })

    it('GET /api/cart', async () => {
      const agent = request.agent(app)

      await agent.post('/auth/login').send(userSignIn)

      const res = await agent.get('/api/cart').expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].id).to.equal(cody.id) //first elem in array is animal obj
      expect(res.body[0].name).to.equal(cody.name)
      expect(res.body[0].imageUrl).to.equal(cody.imageUrl)
      expect(res.body[0].timeUnit).to.equal(cody.timeUnit)
      expect(res.body[0].price).to.equal(cody.price)
      expect(res.body[0].quantity).to.equal(10)
    })

    it('PUT /api/cart/', async () => {
      // should check to see if cart exists.
      // if it exists and is not empty (no items inside cart), set bought to true. do nothing otherwise.
      const agent = request.agent(app)

      await agent.post('/auth/login').send(userSignIn)

      expect(dummyOrder.purchased).to.be.false

      await agent.put('/api/cart').expect(200)

      const updatedOrder = await Order.findOne({id: dummyOrder.id})

      expect(updatedOrder.purchased).to.be.true
    })

    describe('POST /api/cart/:animalId', () => {
      it('should set it to given amount if the cart does not have the item in the cart currently', () => {})
    })
  }) // end describe('/api/cart')
}) // end describe('Car routes')
