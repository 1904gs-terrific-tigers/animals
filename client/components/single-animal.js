import PropTypes from 'prop-types'
import React from 'react'

//component

export const SingleAnimal = props => {
  return <div />
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
