import {combineReducers} from 'redux'
import animals from './animals'

const reducer = combineReducers({animals})
export * from './animals'
export default reducer
