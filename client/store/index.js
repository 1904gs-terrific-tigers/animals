import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import admin from './admin'
import animal from './animal'
import animals from './animals'
import cart from './cart'
import user from './user'

const reducer = combineReducers({user, animals, animal, cart, admin})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './animal'
export * from './animals'
export * from './cart'
export * from './user'
