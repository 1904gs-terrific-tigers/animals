import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, updateCart, submit} from '../store'
import CartItem from './cart-item'

export class Cart extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getItem()
  }

  handleSubmit() {
    this.props.submitOrder()
  }
  handleChange(event) {
    this.props.updatingCart(Number(event.target.id), Number(event.target.value))
  }
  render() {
    if (this.props.cart.length !== 0) {
      return (
        <div>
          <button type="submit">Remove Item</button>
          {this.props.cart.map(item => (
            <div key={item.id}>
              <CartItem animal={item} />
              <input
                id={item.id}
                name="quantity"
                value={item.quantity}
                type="number"
                onChange={this.handleChange}
              />
            </div>
          ))}
          <button type="submit" onClick={this.handleSubmit}>
            Submit order
          </button>
        </div>
      )
    } else return <div />
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getItem: () => dispatch(getCart()),
  updatingCart: (id, qt) => dispatch(updateCart(id, qt)),
  submitOrder: () => dispatch(submit())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
