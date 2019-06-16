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

  describe('GET /api/orders/', () => {
    it('should return an empty array if user has no past orders', async () => {
      // regular auth to make sure person is authorized
      const agent = request.agent(app)
      await agent.post('/auth/login').send(userSignIn)

      const res = await agent.get('/api/orders').expect(200)

      expect(res.body).to.be.instanceOf(Array)
      expect(res.body).to.have.lengthOf(0)
    })

    it('should return an array of the old orders', async () => {
      // regular auth to make sure person is authorized
      const agent = request.agent(app)
      await agent.post('/auth/login').send(anotherUserSignIn)

      const order1 = await anotherUser.createOrder({purchased: true})
      await order1.addAnimalQuantity(lola.id, 100)
      await order1.addAnimalQuantity(cody.id, 100)

      const order2 = await anotherUser.createOrder({purchased: true})
      await order2.addAnimalQuantity(lola.id, 1)

      const res = await agent.get('/api/orders').expect(200)

      expect(res.body).to.be.instanceOf(Array)
      expect(res.body).to.have.lengthOf(2)

      // not sure if it's always sorted, so let's sort
      res.body.sort((a, b) => a.boughtOn < b.boughtOn)

      const [firstOrder, secondOrder] = res.body.map(order =>
        order.animals.map(animal => ({
          name: animal.name,
          quantity: animal.quantity
        }))
      )
      expect(firstOrder).to.have.deep.members([
        {name: 'Lola', quantity: 100},
        {name: 'Cody', quantity: 100}
      ])

      expect(secondOrder).to.have.deep.members([{name: 'Lola', quantity: 1}])
    })
  })
})
