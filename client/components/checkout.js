import axios from 'axios'
import React from 'react'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
const STRIPE_PUBLISHABLE = 'pk_test_8pAUpsXNEuovkFkOlwrnnve900H2lDSFMo'
const CURRENCY = 'USD'
export const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://extreme-petting-zoo.herokuapp.com/api/checkout'
    : 'http://localhost:8080/api/checkout'

const fromDollarToCent = amount => amount * 100

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  console.error(data)
  alert('Issue paying!')
}

const onToken = (amount, description, history) => async token => {
  try {
    await axios.post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount)
    })
    history.push('/thank-you')
  } catch (error) {
    errorPayment(error)
  }
}
const Checkout = props => {
  const name = 'Xtreme shopping'
  const description = 'Purchase time with animals'
  const amount = props.cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  )
  if (props.cart.length === 0) {
    return <Redirect to="/" />
  }
  console.log(props)
  return (
    <StripeCheckout
      name={name}
      description={description}
      amount={fromDollarToCent(amount)}
      token={onToken(amount, description, props.history)}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
  )
}
const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(withRouter(Checkout))
