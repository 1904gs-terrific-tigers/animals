import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {gettingAnimals} from '../store/animals'

export class AllAnimals extends React.Component {
  componentDidMount() {
    //thunk to import the list
    this.props.getAnimals()
  }

  //handleDelete()

  render() {
    return (
      <div>
        {this.props.animals.map(animal => (
          <div key={animal.id}>
            <h2>{animal.name}</h2>
            <img src={animal.imageUrl} />
            <h3>Price: {animal.price}</h3>
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
