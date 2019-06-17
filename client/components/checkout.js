import axios from 'axios'
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'

const STRIPE_PUBLISHABLE = 'pk_test_8pAUpsXNEuovkFkOlwrnnve900H2lDSFMo'
const CURRENCY = 'USD'
export const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://myapidomain.com'
    : 'http://localhost:8080/api/checkout'

const fromEuroToCent = amount => amount * 100

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  console.error(data)
  alert('Payment Error')
}

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment)

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
  return (
    <StripeCheckout
      name={name}
      description={description}
      amount={fromEuroToCent(amount)}
      token={onToken(amount, description)}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
  )
}
const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(Checkout)
