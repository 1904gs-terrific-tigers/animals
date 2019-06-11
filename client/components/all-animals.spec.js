import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllAnimals} from './all-animals'

const adapter = new Adapter()
enzyme.configure({adapter})

let animalsData = [
  {
    id: 1,
    name: 'Cody',
    imageUrl:
      'https://media.treehugger.com/assets/images/2018/03/sloth-sounds.jpg.860x0_q70_crop-scale.jpg',
    species: 'sloth',
    pricePerTimeUnit: 1
  }
]

describe('AllAnimals', () => {
  let animals

  beforeEach(() => {
    animals = shallow(
      <AllAnimals getAnimals={() => {}} animals={animalsData} />
    )
  })

  it('renders an animal name in an h2', () => {
    expect(animals.find('h2').text()).to.be.equal('Cody')
  })

  it('renders an animal price in an h3', () => {
    expect(animals.find('h3').text()).to.be.equal('Price: 1')
  })
})
