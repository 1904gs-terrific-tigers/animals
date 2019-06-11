import Axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ANIMAL = 'GOT_ANIMAL'

/**
 * ACTION CREATORS
 */
const gotAnimal = animal => ({
  type: GOT_ANIMAL,
  animal
})

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * THUNK CREATORS
 */
export const getAnimal = id => {
  return async dispatch => {
    try {
      const {data: animal} = await Axios.get(`/api/animals/${id}`)
      dispatch(gotAnimal(animal))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case GOT_ANIMAL:
      newState = action.animal
      break
    default:
      break
  }

  return newState
}
