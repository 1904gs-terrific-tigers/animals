/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import {Cart} from './cart'

const adapter = new Adapter()
enzyme.configure({adapter})

let cartData = [
  {
    id: 1,
    name: 'Cody',
    imageUrl:
      'https://media.treehugger.com/assets/images/2018/03/sloth-sounds.jpg.860x0_q70_crop-scale.jpg',
    species: 'sloth',
    price: 1,
    quantity: 2
  },
  {
    id: 2,
    name: 'Spend time with catboat',
    imageUrl: 'http://catbo.at/catboat.jpg',
    species: 'catboat',
    price: 100,
    quantity: 3
  }
]

describe('Cart', () => {
  let cart

  beforeEach(() => {
    cart = shallow(
      <Cart
        getItem={() => {}}
        updatingCart={(id, quantity) => {}}
        cart={cartData}
      />
    )
  })

  xit('renders with a key prop', () => {
    expect(
      cart
        .find('div > div')
        .first()
        .key()
    ).to.exist
  })

  xit('renders the correct amount of cart items', () => {
    expect(cart.find('input')).to.have.lengthOf(cartData.length)
  })

  xit('renders quantity in an input tag', () => {
    expect(
      cart
        .find('input')
        .first()
        .prop('value')
    ).to.be.equal(cartData[0].quantity)
  })

  xit('should have a remove item button', () => {
    expect(
      cart
        .find('button')
        .first()
        .text()
    ).to.be.equal('Remove Item')
  })

  xit('should have a submit cart button', () => {
    expect(
      cart
        .find('Button')
        .last()
        .text()
    ).to.be.equal('Submit Order')
  })
})
