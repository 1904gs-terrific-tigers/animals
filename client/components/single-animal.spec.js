import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
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
    pricePerTimeUnit: 100,
    timeUnit: 60
  }

  beforeEach(() => {
    singleAnimal = shallow(<SingleAnimal {...animalData} />)
  })
})
