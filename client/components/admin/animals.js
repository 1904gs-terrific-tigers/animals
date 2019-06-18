import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {gettingAnimals} from '../../store'
import {createAnimal, updateAnimal} from '../../store/admin'

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
      <AnimalForm
        onSubmit={data => {
          props.createAnimal(data)
        }}
      />
      {props.animals.map(animal => {
        const animalUrl = `/animals/${animal.id}`
        return (
          <AnimalForm
            key={animal.id}
            {...animal}
            onSubmit={data => {
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
  const [description, setDescription] = useState(props.description)
  const [imageUrl, setImageUrl] = useState(props.imageUrl)
  const [species, setSpecies] = useState(props.species)
  const [price, setPrice] = useState(props.price)
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
        <textarea
          name="description"
          type="text"
          value={description}
          onChange={makeOnChange(setDescription)}
        />
        <input
          name="imageUrl"
          type="text"
          value={imageUrl}
          onChange={makeOnChange(setImageUrl)}
        />
        <input
          name="species"
          type="text"
          value={species}
          onChange={makeOnChange(setSpecies)}
        />
        <input
          name="price"
          type="number"
          value={price}
          onChange={makeOnChange(setPrice)}
        />
        <button
          type="submit"
          onClick={() => {
            props.onSubmit({
              name,
              description,
              imageUrl,
              species,
              price
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
  updateAnimal: (id, animal) => dispatch(updateAnimal(id, animal)),
  createAnimal: animal => dispatch(createAnimal(animal))
})

export default connect(mapStateToProps, mapDispatchToProps)(Animals)
