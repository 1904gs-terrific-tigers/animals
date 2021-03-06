import PropTypes from 'prop-types'
import {Component, default as React} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import {
  AllAnimals,
  Cart,
  Login,
  OrderHistory,
  Signup,
  SingleAnimal,
  ThankYou,
  UserHome
} from './components'
import AdminAnimals from './components/admin/animals'
import {me} from './store'
import Container from '@material-ui/core/Container'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
 <Container style={{alignItems: 'flex-end'}}>
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={AllAnimals} />
        <Route path="/animals" exact component={AllAnimals} />
        <Route path="/animals/:animalId" component={SingleAnimal} />
        <Route path="/cart" component={Cart} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/" exact component={AllAnimals} />
            <Route path="/animals" exact component={AllAnimals} />
            <Route path="/animals/:animalId" component={SingleAnimal} />
            <Route path="/cart" component={Cart} />

            <Route path="/orders" component={OrderHistory} />
            <Route path="/thank-you" component={ThankYou} />
            {isAdmin && (
              <Route path="/admin/animals" component={AdminAnimals} />
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
</Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin || false
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
