import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {gettingAnimals} from '../../store'
import {updateAnimal} from '../../store/admin'

export const Animals = props => {
  console.log('animals loaded')
  // load on mount
  useEffect(() => {
    props.getAnimals()
  }, [])
  // map over animals
  // have a animalItem component to check stuff and have inputs
  return (
    <div>
      {props.animals.map(animal => {
        const animalUrl = `/animals/${animal.id}`
        return (
          <AnimalForm
            key={animal.id}
            {...animal}
            onSubmit={data => {
              console.log(data)
              props.updateAnimal(animal.id, data)
            }}
          />
        )
      })}
    </div>
  )
}

// make an on change handler with a given stter
// will take the event and call the setter with that target's value
const makeOnChange = setter => event => {
  setter(event.target.value)
}

const AnimalForm = props => {
  const [name, setName] = useState(props.name)
  return (
    <div>
      <div>
        <label htmlFor="name" />
        <input
          name="name"
          type="text"
          value={name}
          onChange={makeOnChange(setName)}
        />
        <button
          type="submit"
          onClick={() => {
            props.onSubmit({
              name
            })
          }}
        >
          Save
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {animals: state.animals}
}

const mapDispatchToProps = dispatch => ({
  getAnimals: () => dispatch(gettingAnimals()),
  updateAnimal: (id, animal) => dispatch(updateAnimal(id, animal))
})

export default connect(mapStateToProps, mapDispatchToProps)(Animals)
