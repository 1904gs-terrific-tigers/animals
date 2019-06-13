import Axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART'
const SUBMIT_CART = 'SUBMIT_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GOT_CART, cart})
const updateQt = (id, qt) => ({type: UPDATE_QUANTITY, id, qt})

/**
 * INITIAL STATE
 */
const initialState = [
  {
    id: 1,
    name: 'Extreme cuddling',
    imageUrl:
      'https://www.telegraph.co.uk/content/dam/news/2017/11/30/TELEMMGLPICT000148018716_trans_NvBQzQNjv4BqutIaqbtdgycbjoKap7Ft85iru5ESH6waxLG5-q_DX4Y.jpeg?imwidth=450',
    description: 'Spend an time with the famous Tony the Tiger',
    species: 'Tiger',
    price: 100,
    timeUnit: 60,
    quantity: 2
  }
]

/**
 * THUNK CREATORS
 */
export const getCart = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/cart`)
      console.log('data in thunk', data)
      dispatch(gotCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// export const getCart = () => {
//     return dispatch => {
//       try {
//         const data = initialState
//         dispatch(gotCart(data))
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

// export const updateCart = (id, qt) => {
//     return dispatch => {
//         try {
//             dispatch(updateQt(id, qt))
//         } catch (error) {
//             console.error(error)
//         }
//     }
// }
/**
 * REDUCER
 */
export default (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case GOT_CART:
      newState = action.cart
      break
    case UPDATE_QUANTITY:
      let idx = newState.findIndex(obj => obj.id === action.id)
      newState[idx].quantity = action.qt
    default:
      break
  }
  return newState
}
