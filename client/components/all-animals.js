import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {gettingAnimals} from '../store/animals'
import {addItem} from '../store/cart'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: 1000,
    height: 900
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  img: {
    zoom: 3,
    display: 'block',
    margin: 'auto',
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%'
  }
}

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

    //jk comments.  I changed to a add to cart icon, which has no qty value, the qty is assumed to be one, which makes this less hacky.
    const qt = 1
    if (this.props.isLoggedIn) this.props.addAnimalTocart(animal, qt)
    else {
      let key = animal.id
      if (!(key in localStorage)) {
        localStorage.setItem(key, JSON.stringify(animal))
      } else {
        localStorage[key]++
      }
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList cellHeight={360} style={styles.gridList}>
          <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
            <ListSubheader component="div">Animals</ListSubheader>
          </GridListTile>
          {this.props.animals.map(animal => {
            const animalUrl = `/animals/${animal.id}`
            return (
              <GridListTile key={animal.id}>
                <Link to={animalUrl}>
                  <img style={styles.img} src={animal.imageUrl} />
                </Link>
                <GridListTileBar
                  title={animal.name}
                  subtitle={<span>price {animal.price}</span>}
                  actionIcon={
                    <IconButton
                      aria-label="add to cart"
                      style={styles.icon}
                      type="submit"
                      onClick={event => {
                        this.handleAddToCart(event, animal)
                      }}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            )
          })}
        </GridList>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    animals: state.animals
  }
}

const mapDispatchToProps = dispatch => ({
  getAnimals: () => dispatch(gettingAnimals()),
  addAnimalTocart: (animal, qt) => dispatch(addItem(animal, qt))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllAnimals)
