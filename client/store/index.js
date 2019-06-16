import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import animal from './animal'
import animals from './animals'
import cart from './cart'
import orders from './orders'
import user from './user'

const reducer = combineReducers({user, animals, animal, cart, orders})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './animal'
export * from './animals'
export * from './cart'
export * from './orders'
export * from './user'
