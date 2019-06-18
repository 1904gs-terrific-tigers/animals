import Axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const SUBMIT_ORDER = 'SUBMIT_ORDER'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const ADDED_ITEM = 'ADDED_ITEM'

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GOT_CART, cart})
export const updateQt = (id, qt) => ({type: UPDATE_QUANTITY, id, qt})
const submitOrder = () => ({type: SUBMIT_ORDER})
export const removeItem = id => ({type: REMOVE_ITEM, id})
export const addedItem = (animal, qt) => ({type: ADDED_ITEM, animal, qt})

/**
 * INITIAL STATE
 */
const initialState = JSON.parse(localStorage.getItem('cart')) || []

/**
 * THUNK CREATORS
 */
export const getCart = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/cart`)
      dispatch(gotCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateCart = (id, qt) => {
  return async dispatch => {
    try {
      await Axios.put(`/api/cart/${id}`, {quantity: qt})
      dispatch(updateQt(id, qt))
    } catch (error) {
      console.error(error)
    }
  }
}

export const submit = () => {
  return async dispatch => {
    try {
      await Axios.put('/api/cart')
      dispatch(submitOrder())
    } catch (err) {
      console.error(err)
    }
  }
}

export const remove = id => {
  return async dispatch => {
    try {
      await Axios.delete(`/api/cart/${id}`)
      dispatch(removeItem(id))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addItem = (animal, qt) => {
  return async dispatch => {
    try {
      await Axios.post(`/api/cart/${animal.id}`, {quantity: qt})
      dispatch(addedItem(animal, qt))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state)),
    idx
  switch (action.type) {
    case GOT_CART:
      newState = action.cart
      break
    case UPDATE_QUANTITY:
      idx = newState.findIndex(obj => obj.id === action.id)
      newState[idx].quantity = action.qt
      break
    case SUBMIT_ORDER:
      newState = []
      break
    case REMOVE_ITEM:
      idx = newState.findIndex(obj => obj.id === action.id)
      newState.splice(idx, 1)
      break
    case ADDED_ITEM:
      {
        let item = action.animal
        item.quantity = action.qt
        const idx = newState.findIndex(obj => obj.id === item.id)
        if (idx > -1) {
          newState[idx] = {
            ...newState[idx],
            ...item,
            quantity: newState[idx].quantity + action.qt
          }
        } else {
          newState.push(item)
        }
      }
      break
    default:
      break
  }
  localStorage.setItem('cart', JSON.stringify(newState))
  return newState
}
