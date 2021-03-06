import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import {SingleAnimal} from './single-animal'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Single Animal', () => {
  let singleAnimal
  let animalData = {
    id: 1,
    name: 'Extreme cuddling',
    imageUrl:
      'https://www.telegraph.co.uk/content/dam/news/2017/11/30/TELEMMGLPICT000148018716_trans_NvBQzQNjv4BqutIaqbtdgycbjoKap7Ft85iru5ESH6waxLG5-q_DX4Y.jpeg?imwidth=450',
    description: 'Spend an time with the famous Tony the Tiger',
    species: 'Tiger',
    price: 100,
    timeUnit: 60
  }

  beforeEach(() => {
    singleAnimal = shallow(<SingleAnimal {...animalData} />)
  })

  it('renders the name in an h1', () => {
    expect(singleAnimal.find('h1').text()).to.be.equal(animalData.name)
  })

  it('renders the species in an h3', () => {
    expect(singleAnimal.find('h3').text()).to.be.equal(animalData.species)
  })

  it('renders the image', () => {
    expect(singleAnimal.find('img').prop('src')).to.be.equal(
      animalData.imageUrl
    )
  })

  it('renders the description', () => {
    expect(singleAnimal.find('div.desc').text()).to.be.equal(
      animalData.description
    )
  })

  it('renders the pricing with correct information somehow', () => {
    expect(singleAnimal.find('div.pricing').text()).to.contain(animalData.price)
    expect(singleAnimal.find('div.pricing').text()).to.contain(
      animalData.timeUnit
    )
  })

  it('renders an input with a default of one', () => {
    const input = singleAnimal.find('#quantity')
    expect(input.prop('name')).to.be.equal('quantity')
  })

  it('has a button to add to cart', () => {
    const input = singleAnimal.find('#submit')
    expect(input).to.have.lengthOf(1)
  })
})
