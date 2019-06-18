import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'arial',
    paddingBottom: 10,
    width: '70%',
    margin: 'auto',
    marginTop: 10
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  menuButton: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  }
}))

const makeOnChange = setter => event => {
  setter(event.target.value)
}

/**
 * COMPONENT
 */
const AuthForm = props => {
  const classes = useStyles()
  const {name, displayName, handleSubmit, error} = props

  return (
    <Paper className={classes.paper}>
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <TextField
            id="outlined-email-input"
            label="Email"
            className={classes.textField}
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            name="password"
            autoComplete="password"
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            className={classes.menuButton}
            variant="contained"
            color="primary"
          >
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
      <div>
        <Link to="/auth/google">{displayName} with Google</Link>
      </div>
    </Paper>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
