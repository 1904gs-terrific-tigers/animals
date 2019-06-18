import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import {
  OrderHistory,
  OrderHistoryAnimalOrder,
  OrderHistoryItem
} from './order-history'

const adapter = new Adapter()
enzyme.configure({adapter})

const lola = {
  id: 1,
  name: 'Lola',
  price: 100,
  imageUrl:
    'https://media.discordapp.net/attachments/123623920879271937/588868872787067074/20190221_192651-1.jpg?width=276&height=411'
}

const cody = {
  id: 2,
  name: 'Cody',
  price: 90,
  imageUrl:
    'https://user-images.githubusercontent.com/12876798/38030875-d3166276-3267-11e8-96d9-309aa8cf008b.png'
}

const orderData = [
  {
    id: 1,
    boughtOn: '2019-06-16T05:10:32.494Z',
    animals: [{...lola, quantity: 3}, {...cody, quantity: 5}]
  },
  {
    id: 2,
    boughtOn: '2019-06-16T05:11:00.119Z',
    animals: [{...cody, quantity: 20}]
  }
]

describe('Order History Page', () => {
  describe('OrderHistory Component', () => {
    let orderHistory
    beforeEach(() => {
      orderHistory = shallow(<OrderHistory orders={orderData} />)
    })

    it('should render correct amount of item elements', () => {
      expect(orderHistory.find(OrderHistoryItem)).to.have.lengthOf(
        orderData.length
      )
    })
  })

  describe('OrderHistoryItem Component', () => {
    let orderHistoryItem
    beforeEach(() => {
      orderHistoryItem = shallow(<OrderHistoryItem {...orderData[0]} />)
    })

    it('should render correct amount of AnimalOrder elements', () => {
      expect(orderHistoryItem.find(OrderHistoryAnimalOrder)).have.lengthOf(
        orderData[0].animals.length
      )
    })

    xit('should have the total', () => {
      const total = orderData[0].animals.reduce((acc, cur) => {
        const curPrice = cur.quantity * cur.price
        return acc + curPrice
      }, 0)
      expect(orderHistoryItem.find('.order-total').text()).to.contain(total)
    })
  })

  describe('OrderHistoryAnimalOrder Component', () => {
    let animalOrder
    const animalData = orderData[0].animals[0]
    beforeEach(() => {
      animalOrder = shallow(<OrderHistoryAnimalOrder {...animalData} />)
    })

    xit('should have the image somewhere', () => {
      expect(animalOrder.find('img').prop('src')).to.be.equal(
        animalData.imageUrl
      )
    })

    xit('should have the quantity', () => {
      expect(animalOrder.find('.animal-order-quantity').text()).to.contain(
        animalData.quantity
      )
    })

    xit('should have the base price', () => {
      expect(animalOrder.find('.animal-order-price').text()).to.contain(
        animalData.price
      )
    })
  })
})
