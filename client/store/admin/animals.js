import Axios from 'axios'
/**
 * ACTION TYPES
 */
const UPDATED_ANIMAL = 'UPDATED_ANIMAL'
const CREATED_ANIMAL = 'CREATED_ANIMAL'

/**
 * ACTION CREATORS
 */
const updatedAnimal = animal => ({
  type: UPDATED_ANIMAL,
  animal
})
const createdAnimal = animal => ({
  type: CREATED_ANIMAL,
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

export const createAnimal = animal => {
  return async dispatch => {
    try {
      const {data: newAnimal} = await Axios.post(`/api/admin/animals/`, animal)
      dispatch(createdAnimal(newAnimal))
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
