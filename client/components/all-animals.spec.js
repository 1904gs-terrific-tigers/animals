import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllAnimals} from './all-animals'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllAnimals', () => {
  let animals
  let animalsData = [
    {
      id: 1,
      name: 'Cody',
      imageUrl:
        'https://media.treehugger.com/assets/images/2018/03/sloth-sounds.jpg.860x0_q70_crop-scale.jpg',
      species: 'sloth',
      pricePerTimeUnit: 1
    },
    {
      id: 2,
      name: 'Simba',
      imageUrl:
        'https://media.cntraveler.com/photos/53ec0c68976f8f2d44d5ab1e/master/w_420,c_limit/tiger-cubs.jpg',
      species: 'tiger',
      pricePerTimeUnit: 2
    }
  ]

  beforeEach(() => {
    animals = shallow(<AllAnimals animals={animalsData} />)
  })

  it('renders an animal name in an h3', () => {
    expect(AllAnimals.find('h3').text()).to.be.equal(animals.name)
  })
})
