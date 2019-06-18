/* eslint-disable no-unused-expressions */
import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
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
    price: 1
  },
  {
    id: 2,
    name: 'Spend time with catboat',
    imageUrl: 'http://catbo.at/catboat.jpg',
    species: 'catboat',
    price: 100
  }
]

describe('AllAnimals', () => {
  let animals

  beforeEach(() => {
    animals = shallow(
      <AllAnimals getAnimals={() => {}} animals={animalsData} />
    )
  })

  xit('renders with a key prop', () => {
    expect(
      animals
        .find('GridListTile')
        .second()
        .key()
    ).to.exist
  })

  it('renders the correct amount of animals', () => {
    expect(animals.find('img')).to.have.lengthOf(animalsData.length)
  })

  xit('renders an animal name in an h2', () => {
    expect(
      animals
        .find('h2')
        .first()
        .text()
    ).to.be.equal(animalsData[0].name)
  })

  it("renders the animal's image", () => {
    expect(
      animals
        .find('img')
        .first()
        .prop('src')
    ).to.be.equal(animalsData[0].imageUrl)
  })

  xit('renders an animal price in an h3', () => {
    expect(
      animals
        .find('h3')
        .first()
        .text()
    ).to.contain(animalsData[0].price)
  })

  xit('should have a button', () => {
    expect(
      animals
        .find('button')
        .first()
        .text()
    ).to.be.equal('Add to Cart')
  })
})
