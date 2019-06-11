import axios from 'axios'
import history from '../history'

//INITIAL STATE
const initialState = []

//ACTION TYPES
const GET_ANIMALS = 'GET_ANIMALS'

//ACTION CREATORS
const getAnimals = animals => ({type: GET_ANIMALS, animals})

//THUNKS
export const gettingAnimals = () => async dispatch => {
  try {
    // fetch and destructure data and alias it as 'animals'
    const {data: animals} = await axios.get('/api/animals')
    dispatch(getAnimals(animals))
  } catch (err) {
    console.error('hey we had an error', err)
  }
}

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ANIMALS:
      return action.animals
    default:
      return state
  }
}
