import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {expect} from 'chai'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {addItem, getCart, remove, submit, updateCart} from './cart'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

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

describe('thunk creators', () => {
  let store
  let mockAxios
  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getCart thunk', () => {
    it('dispatches GOT_CART action', async () => {
      mockAxios.onGet(`/api/cart`).replyOnce(200, cartData)
      await store.dispatch(getCart(cartData))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_CART')
      expect(actions[0].cart).to.be.deep.equal(cartData)
    })
  })

  describe('updateCart thunk', () => {
    it('dispatches UPDATE_QUANTITY action', async () => {
      store = mockStore(cartData)
      mockAxios.onPut(`/api/cart/${cartData[0].id}`).replyOnce(202)
      await store.dispatch(updateCart(cartData[0].id, cartData[0].quantity))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATE_QUANTITY')
      expect(actions[0].id).to.be.deep.equal(cartData[0].id)
      expect(actions[0].qt).to.be.deep.equal(cartData[0].quantity)
    })
    it('dispatches UPDATE_QUANTITY action on a cart with multiple items', async () => {
      store = mockStore(cartData)
      mockAxios.onPut(`/api/cart/${cartData[1].id}`).replyOnce(202)
      await store.dispatch(updateCart(cartData[1].id, cartData[1].quantity))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATE_QUANTITY')
      expect(actions[0].id).to.be.equal(cartData[1].id)
      expect(actions[0].qt).to.be.equal(cartData[1].quantity)
    })
  })

  describe('submit thunk', () => {
    it('dispatches SUBMIT_ORDER action', async () => {
      mockAxios.onPut(`/api/cart`).replyOnce(200, cartData)
      await store.dispatch(submit())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SUBMIT_ORDER')
      expect(store.getState()).to.be.deep.equal(initialState)
    })
  })

  describe('remove thunk', () => {
    it('dispatches REMOVE_ITEM action', async () => {
      store = mockStore(cartData)
      mockAxios.onDelete(`/api/cart/${cartData[0].id}`).replyOnce(204)
      await store.dispatch(remove(cartData[0].id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_ITEM')
      expect(actions[0].id).to.be.equal(cartData[0].id)
    })
  })
  describe('add item thunk', () => {
    it('dispatches ADDDED_ITEM action', async () => {
      store = mockStore(cartData)
      mockAxios.onPost(`/api/cart/${cartData[0].id}`).replyOnce(204)
      const quantity = 10
      await store.dispatch(addItem(cartData[0], quantity))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADDED_ITEM')
      expect(actions[0].animal).to.be.deep.equal(cartData[0])
      expect(actions[0].qt).to.be.deep.equal(quantity)
    })
  })
})
