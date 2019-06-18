import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2)
  }
}))

const Navbar = ({handleClick, isLoggedIn, cart}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{alignItems: 'center'}}>
        <div>
          <Toolbar>
            <div>
              <Button
                component={Link}
                to="/animals"
                className={classes.menuButton}
                variant="contained"
                color="primary"
              >
                View Animals
              </Button>
              <Button
                className={classes.menuButton}
                component={Link}
                to="/cart"
                variant="contained"
                color="primary"
              >
                Shopping Cart {cart.length > 0 ? `(${cart.length})` : ''}
              </Button>
            </div>
            <Typography className={classes.title} color="inherit">
              Extreme Petting Zoo
            </Typography>
            {isLoggedIn ? (
              <div>
                <Button
                  className={classes.menuButton}
                  component={Link}
                  to="/home"
                  variant="contained"
                  color="primary"
                >
                  Home
                </Button>

                <Button
                  className={classes.menuButton}
                  component={Link}
                  to="/orders"
                  variant="contained"
                  color="primary"
                >
                  Orders
                </Button>

                <Button
                  className={classes.menuButton}
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Button
                  className={classes.menuButton}
                  component={Link}
                  to="/login"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
                <Button
                  className={classes.menuButton}
                  component={Link}
                  to="/signup"
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </Toolbar>
        </div>
      </AppBar>
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
