import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {expect} from 'chai'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {getAnimal} from './animal'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {animal: {}}

  const tony = {
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
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAnimal thunk', () => {
    it('dispatches GOT_ANIMAL action', async () => {
      mockAxios.onGet(`/api/animals/${tony.id}`).replyOnce(200, tony)
      await store.dispatch(getAnimal(tony.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ANIMAL')
      expect(actions[0].animal).to.be.deep.equal(tony)
    })
  })
})
