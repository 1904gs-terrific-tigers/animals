/* eslint-disable no-unused-expressions */
/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {User, Order, AnimalOrder, Animal} = require('../db/models')

// we scope the agent to each test in order to not have other tests affect
// the routes we're trying to test. The database is updated in general
// because those are some things we're not really touching but just using
// so we want to share them between all tests

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
        await agent.put('/api/cart').expect(204)

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
        const res = await agent.put('/api/cart').expect(412)
        // we expect an error to be in the body some with some message
        expect(res.body.error).to.exist

        // and now let's check to make sure it didn't do anything
        const updatedOrder = await Order.findOne({id: dummyOrder.id})
        expect(updatedOrder.purchased).to.be.false
      })
    })

    describe('POST /api/cart/:animalId', () => {
      it('should set item to given amount if the cart does not have the item in the cart currently', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)

        // update cart to add lola to it with quant 3
        await agent
          .post(`/api/cart/${lola.id}`)
          .send({quantity: 3})
          .expect(202)

        // fetch animals in the updated order
        const animalsInOrder = await dummyOrder.getAnimals()
        expect(animalsInOrder).to.have.lengthOf(2)
        // grab individual quantities
        const quantities = animalsInOrder.map(
          animal => animal.animalOrder.quantity
        )

        expect(quantities).to.have.all.members([10, 3])
      })

      it('should add the quantity if the cart already has the item', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)

        // cody should now be whatever it was + 90
        await agent
          .post(`/api/cart/${cody.id}`)
          .send({quantity: 90})
          .expect(202)

        // fetch animals in the updated order
        const animalsInOrder = await dummyOrder.getAnimals()
        expect(animalsInOrder).to.have.lengthOf(2)
        // grab individual quantities
        const quantities = animalsInOrder.map(
          animal => animal.animalOrder.quantity
        )

        expect(quantities).to.have.all.members([100])
      })
    })

    describe('PUT /api/cart/:animalId', () => {
      it('should set item to given amount if the cart does not have the item in the cart currently', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)

        // update cart to set lola to quant 3
        await agent
          .put(`/api/cart/${lola.id}`)
          .send({quantity: 3})
          .expect(204)

        // fetch animals in the updated order
        const animalsInOrder = await dummyOrder.getAnimals()
        expect(animalsInOrder).to.have.lengthOf(2)
        // grab individual quantities
        const quantities = animalsInOrder.map(
          animal => animal.animalOrder.quantity
        )

        expect(quantities).to.have.all.members([10, 3])
      })
      it('should set item to given amount if cart already has the item in cart', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)

        // update cart to set cody to quant 3
        await agent
          .put(`/api/cart/${cody.id}`)
          .send({quantity: 3})
          .expect(204)

        // fetch animals in the updated order
        const animalsInOrder = await dummyOrder.getAnimals()
        expect(animalsInOrder).to.have.lengthOf(2)
        // grab individual quantities
        const quantities = animalsInOrder.map(
          animal => animal.animalOrder.quantity
        )

        expect(quantities).to.have.all.members([3])
      })
    })
  }) // end describe('/api/cart')
}) // end describe('Car routes')
