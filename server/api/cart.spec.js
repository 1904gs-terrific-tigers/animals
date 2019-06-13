/* eslint-disable no-unused-expressions */
/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {User, Order, AnimalOrder, Animal} = require('../db/models')

describe('Cart routes', () => {
  let dummyUser, dummyOrder, cody, lola

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
    lola = await Animal.create({
      name: 'Lola',
      species: 'cat',
      price: 1000
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

    describe('PUT /api/cart/', () => {
      // should check to see if cart exists.
      // if it exists and is not empty (no items inside cart), set bought to true. do nothing otherwise.

      it('should set cart to purchased if it has items in it', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)

        // sanity check
        expect(dummyOrder.purchased).to.be.false

        // actually update the cart now
        await agent.put('/api/cart').expect(200)

        // and now we'll check the order to make sure it's changed
        const updatedOrder = await Order.findOne({id: dummyOrder.id})
        expect(updatedOrder.purchased).to.be.true
      })

      it('should do nothing if the cart has no items in it', async () => {
        // we'll remove cody from the order first
        await dummyOrder.removeAnimal(cody)

        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)
        // sanity check
        expect(dummyOrder.purchased).to.be.false

        // we expect some 400-series error because not allowed
        await agent.put('/api/cart').expect(412)

        // and now let's check to make sure it didn't do anything
        const updatedOrder = await Order.findOne({id: dummyOrder.id})
        expect(updatedOrder.purchased).to.be.false
      })
    })

    describe('POST /api/cart/:animalId', () => {
      it('should set item to given amount if the cart does not have the item in the cart currently', () => {})
    })
  }) // end describe('/api/cart')
}) // end describe('Car routes')
