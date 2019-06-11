import {expect} from 'chai'
import {gettingAnimals} from './animals'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {animals: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('gettingAnimals', () => {
    it('eventually dispatches the GET ANIMALS action', async () => {
      const fakeAnimals = [
        {
          id: 1,
          name: 'Cody',
          imageUrl:
            'https://media.treehugger.com/assets/images/2018/03/sloth-sounds.jpg.860x0_q70_crop-scale.jpg'
        }
      ]
      mockAxios.onGet('/api/animals').replyOnce(200, fakeAnimals)
      await store.dispatch(gettingAnimals())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ANIMALS')
      expect(actions[0].animals).to.be.deep.equal(fakeAnimals)
    })
  })
})
