import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getAnimal, addItem, addedItem} from '../store'

import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '60%',
    overflowX: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    fontFamily: 'arial'
  },
  singleAnimalImg: {
    width: '90%',
    borderRadius: 15,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  singleAnimalHead: {
    textAlign: 'center'
  },
  singleAnimalFoot: {
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    alignItems: 'center'
  }
}))

//component

export const SingleAnimal = props => {
  const classes = useStyles()
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
    <Paper className={classes.paper}>
      <div className={classes.singleAnimalFoot}>
        <h1 className={classes.singleAnimalHead}>{props.name}</h1>
        <h3 className={classes.singleAnimalHead}>{props.species}</h3>
        <img className={classes.singleAnimalImg} src={props.imageUrl} />
        <div className="desc">
          <p>{props.description}</p>
        </div>
        <div className="pricing">
          <p>
            ${props.price} / {props.timeUnit} min
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="quantity"
        >
          <span>
            <TextField
              id="quantity"
              label="Quantity:"
              value={quantity}
              onChange={event => setQuantity(event.target.value)}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
              name="quantity"
            />
          </span>
          <Button
            id="submit"
            type="submit"
            onClick={() => props.addToCart(animal, quantity)}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Add to Cart
          </Button>
        </div>
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
    </Paper>

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
