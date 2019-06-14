import React from 'react'

const CartItem = props => {
  const animal = props.animal
  return (
    <div>
      <img src={animal.imageUrl} style={{maxWidth: 200, maxHeight: 200}} />
      <h3>{animal.name}</h3>
      <h4>{animal.price}</h4>
    </div>
  )
}

export default CartItem
