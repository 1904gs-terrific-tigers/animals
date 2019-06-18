import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  }
}

const ThankYou = props => {
  return (
    <div style={styles.root}>
      <div>
        <p>Thank you for purchasing!</p>
        <Link to="/orders">Click here to go your orders</Link>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(ThankYou)
