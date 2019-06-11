import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_ANIMALS = 'GET_ANIMALS'

//INITIAL STATE
const initialState = []

//ACTION CREATORS
const getAnimals = animals => ({type: GET_ANIMALS, animals})

//THUNKS
export const gettingAnimals = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/animals')
    console.log('Data from thunk', data)
    dispatch(getAnimals(data))
  } catch (err) {
    console.error('hey we had an error', err)
  }
}

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANIMALS:
      console.log('action.animals', action.animals)
      return action.animals
    default:
      return state
  }
}
