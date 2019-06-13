import Axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const SUBMIT_ORDER = 'SUBMIT_ORDER'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GOT_CART, cart})
const updateQt = (id, qt) => ({type: UPDATE_QUANTITY, id, qt})
const submitOrder = () => ({type: SUBMIT_ORDER})
const removeItem = id => ({type: REMOVE_ITEM, id})

/**
 * INITIAL STATE
 */
const initialState = []

const fakeState = [
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

// export const getCart = () => {
//     return dispatch => {
//       try {

//         dispatch(gotCart(fakeState))
//       } catch (err) {
//         console.error(err)
//       }
//     }
//   }

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
// export const remove = id => {
//     return dispatch => {
//         try {

//             dispatch(removeItem(id))
//         } catch (error) {
//             console.error(error)
//         }
//     }
// }

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
    default:
      break
  }
  return newState
}
