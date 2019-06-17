import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {expect} from 'chai'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {getOrders} from './orders'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('order thunk creators', () => {
  let store
  let mockAxios

  const initialState = {animal: {}}

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

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getOrders thunk', () => {
    it('dispatches GOT_ORDERS action', async () => {
      mockAxios.onGet(`/api/orders/`).replyOnce(200, orderData)
      await store.dispatch(getOrders())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ORDERS')
      expect(actions[0].orders).to.be.deep.equal(orderData)

      console.log(store.getState())
    })
  })
})
