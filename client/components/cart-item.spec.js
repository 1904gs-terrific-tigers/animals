import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import CartItem from './cart-item'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart Item', () => {
  let singleItem
  let cartData = {
    id: 2,
    name: 'Spend time with catboat',
    imageUrl: 'http://catbo.at/catboat.jpg',
    species: 'catboat',
    price: 100,
    quantity: 3
  }

  beforeEach(() => {
    singleItem = shallow(<CartItem item={cartData} />)
  })

  xit('renders the image in an h3', () => {
    expect(singleItem.find('h3').text()).to.be.equal(cartData.name)
  })

  xit('renders the price in an h4', () => {
    expect(singleItem.find('h4').text()).to.contain(cartData.price)
  })

  xit('renders the image', () => {
    expect(singleItem.find('img').prop('src')).to.be.equal(cartData.imageUrl)
  })
})
