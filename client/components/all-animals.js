import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class AllAnimals extends React.Component {
  render() {
    return (
      <div>
        {this.props.animals.map(animal => (
          <div key={animal.id}>
            <h3>{animal.name}</h3>
            <img src={animal.imageUrl} />
            <h3>Price: {animal.pricePerTimeUnit}</h3>
          </div>
        ))}
      </div>
    )
  }
}
