import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {gettingAnimals} from '../store/animals'
import {addItem} from '../store/cart'

export class AllAnimals extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    //thunk to import the list
    this.props.getAnimals()
  }

  handleAddToCart(event, animal) {
    // this is a really hacky way to do this but it works for now.
    // if the structure below is changed, this will probably not work anymore
    const qt = event.target.previousSibling.value
    this.props.addAnimalTocart(animal, qt)
  }

  render() {
    return (
      <div>
        {this.props.animals.map(animal => {
          const animalUrl = `/animals/${animal.id}`
          return (
            <div key={animal.id}>
              <Link to={animalUrl}>
                <h2>{animal.name}</h2>
              </Link>
              <Link to={animalUrl}>
                <img src={animal.imageUrl} />
              </Link>
              <h3>Price: {animal.price}</h3>
              <input type="number" />
              <button
                type="submit"
                onClick={event => {
                  this.handleAddToCart(event, animal)
                }}
              >
                Add to Cart
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {animals: state.animals}
}

const mapDispatchToProps = dispatch => ({
  getAnimals: () => dispatch(gettingAnimals()),
  addAnimalTocart: (animal, qt) => dispatch(addItem(animal, qt))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllAnimals)
