import PropTypes from 'prop-types'
import React from 'react'

//component

export const SingleAnimal = props => {
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
          ${props.pricePerTimeUnit} / {props.timeUnit} min
        </p>
      </div>
      <div className="quantity">
        <span>
          <label htmlFor="quantity">Quantity:</label>
        </span>
        <span>
          <input id="quantity" name="quantity" value="1" type="number" />
        </span>
      </div>
      <button type="submit">Add to Cart</button>
    </div>
  )
}

SingleAnimal.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  species: PropTypes.string,
  pricePerTimeUnit: PropTypes.number,
  timeUnit: PropTypes.number
}
