import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gettingAnimals} from '../store/animals'

class AllAnimals extends React.Component {
  componentDidMount() {
    //thunk to import the list
    this.props.getAnimals()
  }

  //handleDelete()

  render() {
    console.log('this.props in Component', this.props)
    return (
      <div>
        <h1>TESTING ALL ANIMALS</h1>
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

const mapStateToProps = state => {
  return {animals: state.animals}
}

const mapDispatchToProps = dispatch => ({
  getAnimals: () => dispatch(gettingAnimals())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllAnimals)
