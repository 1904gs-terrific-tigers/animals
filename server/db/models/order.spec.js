/* eslint-disable no-unused-expressions */
/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')
const Animal = db.model('animal')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let cody, order, lola
    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      order = await cody.createOrder({
        purchased: false
      })
      lola = await Animal.create({
        name: 'lola',
        price: 100,
        species: 'cat'
      })
    })
    describe('getHandlerToPurchase', () => {
      it('returns an error if the cart is empty', () => {
        const [err, handler] = order.getHandlerToPurchase()
        expect(err).to.not.be.undefined
        expect(handler).to.be.undefined
      })

      it('returns a function if the order is not empty', async () => {
        await order.addAnimalQuantity(lola.id, 10)
        // let's reload the order so we know the animals are there
        const [eagerOrder, created] = await Order.getCurrentOrderForUserId(
          cody.id
        )
        // now run the function itself
        const [err, handler] = eagerOrder.getHandlerToPurchase()
        expect(err).to.be.undefined
        expect(handler).to.be.a('function')

        await handler()
        await eagerOrder.reload()
        expect(eagerOrder.purchased).to.be.true
      })
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
