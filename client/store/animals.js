import axios from 'axios'

//INITIAL STATE
const initialState = []

//ACTION TYPES
const GET_ANIMALS = 'GET_ANIMALS'
const UPDATED_ANIMAL = 'UPDATED_ANIMAL'
const CREATED_ANIMAL = 'CREATED_ANIMAL'

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
    case CREATED_ANIMAL:
      return [action.animal, ...state]
    case UPDATED_ANIMAL:
      return state.map(animal => {
        if (animal.id === action.id) {
          return action.animal
        }
        return animal
      })
    default:
      return state
  }
}
