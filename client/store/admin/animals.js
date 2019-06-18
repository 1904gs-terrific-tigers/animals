import Axios from 'axios'
/**
 * ACTION TYPES
 */
const UPDATED_ANIMAL = 'UPDATED_ANIMAL'

/**
 * ACTION CREATORS
 */
const updatedAnimal = animal => ({
  type: UPDATED_ANIMAL,
  animal
})

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * THUNK CREATORS
 */
export const updateAnimal = (id, animal) => {
  return async dispatch => {
    try {
      await Axios.put(`/api/admin/animals/${id}`, animal)
      dispatch(updatedAnimal(id, animal))
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
    default:
      return state
  }
}
