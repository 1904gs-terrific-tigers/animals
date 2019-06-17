import Axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'

/**
 * ACTION CREATORS
 */
const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * THUNK CREATORS
 */
export const getOrders = () => {
  return async dispatch => {
    try {
      const {data: orders} = await Axios.get(`/api/orders/`)
      dispatch(gotOrders(orders))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders
    default:
      return state
  }
}
