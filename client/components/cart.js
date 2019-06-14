import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, remove, submit, updateCart} from '../store'
import CartItem from './cart-item'

export class Cart extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
  componentDidMount() {
    this.props.getItem()
  }

  handleRemove(event) {
    this.props.removeItem(Number(event.target.id))
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
          {this.props.cart.map(item => (
            <div key={item.id}>
              <button id={item.id} onClick={this.handleRemove} type="submit">
                Remove Item
              </button>
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
          <div className="total">
            <p>
              Subtotal: ${this.props.cart.map(
                item => item.quantity * item.price
              )}
            </p>
          </div>
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
  submitOrder: () => dispatch(submit()),
  removeItem: id => dispatch(remove(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
