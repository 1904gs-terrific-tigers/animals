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
  // will have dummy order associated with them
  let dummyUser, dummyOrder

  // animals
  let cody, lola

  let userSignIn = {
    email: 'cody@puppybook.com',
    password: '123'
  }

  // does not have order associated with them
  let anotherUser
  const anotherUserSignIn = {
    email: 'cody@doggybook.com',
    password: '124'
  }

  beforeEach(async () => {
    await db.sync({force: true})

    dummyUser = await User.create(userSignIn)
    anotherUser = await User.create(anotherUserSignIn)

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

    describe('GET /api/cart', () => {
      it('should error if user not logged in', async () => {
        const agent = request.agent(app)
        const res = await agent.get('/api/cart').expect(401)

        expect(res.body.error).to.exist
      })

      it('gets a users cart', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)
        // get the actual cart
        const res = await agent.get('/api/cart').expect(200)
        // check EVERYTHING
        expect(res.body).to.be.an('array')
        expect(res.body[0].id).to.equal(cody.id) //first elem in array is animal obj
        expect(res.body[0].name).to.equal(cody.name)
        expect(res.body[0].imageUrl).to.equal(cody.imageUrl)
        expect(res.body[0].timeUnit).to.equal(cody.timeUnit)
        expect(res.body[0].price).to.equal(cody.price)
        expect(res.body[0].quantity).to.equal(10)
      })

      it('returns an empty array if no cart exists', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(anotherUserSignIn)
        // get the actual cart
        const res = await agent.get('/api/cart').expect(200)

        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(0)
      })

      it('gets the correct users cart', async () => {
        const secondUserLogin = {email: 'a@a.', password: '124'}
        const secondUser = await User.create(secondUserLogin)
        const secondUserOrder = await secondUser.createOrder({
          purchased: false
        })
        await secondUserOrder.addAnimal(lola, {
          through: {
            quantity: 2,
            price: lola.price
          }
        })

        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(secondUserLogin)
        // get the actual cart
        const res = await agent.get('/api/cart').expect(200)
        // check EVERYTHING
        expect(res.body).to.be.an('array')
        expect(res.body[0].id).to.equal(lola.id) //first elem in array is animal obj
        expect(res.body[0].name).to.equal(lola.name)
        expect(res.body[0].imageUrl).to.equal(lola.imageUrl)
        expect(res.body[0].timeUnit).to.equal(lola.timeUnit)
        expect(res.body[0].price).to.equal(lola.price)
        expect(res.body[0].quantity).to.equal(2)
      })
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
        // we expect an error to be in the body with some message
        expect(res.body.error).to.exist

        // and now let's check to make sure it didn't do anything
        const updatedOrder = await Order.findOne({id: dummyOrder.id})
        expect(updatedOrder.purchased).to.be.false
      })
    })

    describe('POST /api/cart/:animalId', () => {
      it('should error if animalId is not a valid variable', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)

        const res = await agent
          .post(`/api/cart/a`)
          .send({quantity: 3})
          .expect(400)

        expect(res.body.error).to.exist
      })

      it('should set item to given amount if the cart does not have the item in the cart currently', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)

        // update cart to add lola to it with quant 3
        await agent
          .post(`/api/cart/${lola.id}`)
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

      it('should add the quantity if the cart already has the item', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)

        // cody should now be whatever it was + 90
        await agent
          .post(`/api/cart/${cody.id}`)
          .send({quantity: 90})
          .expect(204)

        // fetch animals in the updated order
        const animalsInOrder = await dummyOrder.getAnimals()
        expect(animalsInOrder).to.have.lengthOf(1)
        // grab individual quantities
        const quantities = animalsInOrder.map(
          animal => animal.animalOrder.quantity
        )

        expect(quantities).to.have.all.members([100])
      })
      it('should create a cart if needed before adding', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(anotherUserSignIn)

        // note that the cart is not created yet but we want to put something in
        await agent
          .post(`/api/cart/${lola.id}`)
          .send({quantity: 3})
          .expect(204)

        const [cart, created] = await Order.getCurrentOrderForUserId(
          anotherUser.id
        )
        const animals = await cart.getAnimals()
        expect(animals).to.be.an('array')
        expect(animals).to.have.lengthOf(1)
      })
    })

    describe('PUT /api/cart/:animalId', () => {
      it('should error if animalId is not a valid variable', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)

        const res = await agent
          .put(`/api/cart/a`)
          .send({quantity: 3})
          .expect(400)

        expect(res.body.error).to.exist
      })

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
        expect(animalsInOrder).to.have.lengthOf(1)
        // grab individual quantities
        const quantities = animalsInOrder.map(
          animal => animal.animalOrder.quantity
        )

        expect(quantities).to.have.all.members([3])
      })

      it('should create a cart if needed before adding', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(anotherUserSignIn)

        // note that the cart is not created yet but we want to put something in
        await agent
          .put(`/api/cart/${lola.id}`)
          .send({quantity: 3})
          .expect(204)

        const [cart, created] = await Order.getCurrentOrderForUserId(
          anotherUser.id
        )
        const animals = await cart.getAnimals()
        expect(animals).to.be.an('array')
        expect(animals).to.have.lengthOf(1)
      })
    })
    describe('DELETE /api/cart/:animalId', () => {
      it('should delete an existing item from a cart', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)

        // delete cody from cart
        await agent.delete(`/api/cart/${cody.id}`).expect(204)

        // fetch animals in the updated order
        const animalsInOrder = await dummyOrder.getAnimals()
        expect(animalsInOrder).to.have.lengthOf(0)
      })
      it('should do nothing if the item is not in the cart', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userSignIn)
        // delete lola from cart (she's not in it)
        await agent.delete(`/api/cart/${lola.id}`).expect(204)

        // fetch animals in the updated order
        const animalsInOrder = await dummyOrder.getAnimals()
        expect(animalsInOrder).to.have.lengthOf(1)
        expect(animalsInOrder[0].name).to.equal(cody.name)
      })
    })
  }) // end describe('/api/cart')
}) // end describe('Car routes')
