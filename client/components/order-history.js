import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const OrderHistory = props => {
  return (
    <div className="order-history">
      {props.orders.map(order => (
        <OrderHistoryItem {...order} key={order.id} />
      ))}
    </div>
  )
}

export const OrderHistoryItem = props => {
  const orderUrl = `/orders/${props.id}`
  const total = props.animals.reduce((acc, cur) => {
    const curPrice = cur.quantity * cur.price
    return acc + curPrice
  }, 0)
  return (
    <div className="order-item">
      <Link to={orderUrl}>Purchased {props.boughtOn}</Link>
      <div className="order-contents">
        {props.animals.map(animal => (
          <OrderHistoryAnimalOrder {...animal} key={animal.id} />
        ))}
      </div>
      <div className="order-total">Total: ${total}</div>
    </div>
  )
}

export const OrderHistoryAnimalOrder = props => {
  const animalUrl = `/animals/${props.id}`
  return (
    <div className="animal-order ">
      <div className="animal-order-left">
        <Link to={animalUrl}>
          <img
            style={{maxWidth: '100px', maxHeight: '100px'}}
            src={props.imageUrl}
          />
        </Link>
        <span className="animal-order-quantity">{props.quantity}</span>
      </div>
      <div className="animal-order-name">
        <Link to={animalUrl}>
          <span>{props.name}</span>
        </Link>
      </div>
      <div className="animal-order-price">{props.price}</div>
    </div>
  )
}

const mapStateToProps = state => {}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
