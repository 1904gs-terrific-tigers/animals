import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getAnimal} from '../store'

//component

export const SingleAnimal = props => {
  useEffect(() => {
    props.getAnimal(props.match.params.animalId)
  }, [])
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
          <input id="quantity" name="quantity" defaultValue="1" type="number" />
        </span>
      </div>
      <button type="submit">Add to Cart</button>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state.animal
})

const mapDispatchToProps = dispatch => ({
  getAnimal: id => dispatch(getAnimal(id))
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
