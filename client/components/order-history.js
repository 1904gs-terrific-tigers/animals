import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getOrders} from '../store/orders'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableFooter from '@material-ui/core/TableFooter'
import Button from '@material-ui/core/Button'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const styles = {
  root: {
    width: '100%',
    maxWidth: 360
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
    marginTop: 10
  },
  table: {
    minWidth: 650
  },
  button: {
    width: '100%'
  }
}

export const OrderHistory = props => {
  // componentDidMount essentially
  useEffect(() => {
    props.getOrders()
  }, [])

  return (
    <Paper style={styles.paper}>
      {props.orders.map(order => {
        const orderUrl = `/orders/${order.id}`
        return (
          <div key={order.id}>
            <Link to={orderUrl}>
              <Button style={styles.button} type="submit">
                Order Number: {order.id}
              </Button>
            </Link>
            <OrderHistoryItem {...order} key={order.id} />
          </div>
        )
      })}
    </Paper>
  )
}

export const OrderHistoryItem = props => {
  const total = props.animals.reduce((acc, cur) => {
    const curPrice = cur.quantity * cur.price
    return acc + curPrice
  }, 0)
  return (
    <Table style={styles.table}>
      <TableHead>
        <TableRow>
          <TableCell align="left">Items:</TableCell>
          <TableCell align="right">Activity</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Subtotal</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.animals.map(animal => (
          <OrderHistoryAnimalOrder {...animal} key={animal.id} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell align="left">Puchased: {props.boughtOn}</TableCell>
          <TableCell align="right" />
          <TableCell align="right" />
          <TableCell align="right" />
          <TableCell align="right">Total Puchase: {total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export const OrderHistoryAnimalOrder = props => {
  const animalUrl = `/animals/${props.id}`
  return (
    <TableRow key={props.id}>
      <TableCell>
        <ListItemAvatar>
          <Avatar alt={props.name} src={props.imageUrl} />
        </ListItemAvatar>
      </TableCell>
      <TableCell align="right">
        <Link to={animalUrl}>{props.name}</Link>
      </TableCell>
      <TableCell align="right">{props.price}</TableCell>
      <TableCell align="right">{props.quantity}</TableCell>
      <TableCell align="right">{props.quantity * props.price}</TableCell>
    </TableRow>
  )
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(getOrders())
})

OrderHistory.propTypes = {
  getOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
