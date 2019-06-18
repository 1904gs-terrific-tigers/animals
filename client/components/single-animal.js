import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getAnimal, addItem, addedItem} from '../store'

//component

export const SingleAnimal = props => {
  useEffect(() => {
    props.getAnimal(props.match.params.animalId)
  }, [])

  const animal = {
    id: props.id,
    name: props.name,
    imageUrl: props.imageUrl,
    price: props.price
  }

  const [quantity, setQuantity] = useState(1)

  return (
    <div>
      <h1>{props.name}</h1>
      <h3>{props.species}</h3>
      <img src={props.imageUrl} />
      <div className="desc">
        <p>{props.description}</p>
      </div>
      <div className="pricing">
        <p>
          ${props.price} / {props.timeUnit} min
        </p>
      </div>
      <div className="quantity">
        <span>
          <label htmlFor="quantity">Quantity:</label>
        </span>
        <span>
          <input
            id="quantity"
            name="quantity"
            onChange={event => setQuantity(event.target.value)}
            value={quantity}
            type="number"
          />
        </span>
      </div>
      <button
        type="submit"
        onClick={() => {
          if (props.isLoggedIn) props.addToCart(animal, quantity)
          else props.addAnimalToGuest(animal, quantity)
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state.animal,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  getAnimal: id => dispatch(getAnimal(id)),
  addToCart: (animal, qt) => dispatch(addItem(animal, qt)),
  addAnimalToGuest: (animal, qt) => dispatch(addedItem(animal, qt))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAnimal)

SingleAnimal.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  species: PropTypes.string,
  price: PropTypes.number,
  timeUnit: PropTypes.number
}
