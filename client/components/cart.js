import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCart, remove, submit, updateCart} from '../store'
import CartItem from './cart-item'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableFooter from '@material-ui/core/TableFooter'
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    width: '100%',
    maxWidth: 360
  },
  paper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  button: {
    width: '100%'
  }
}

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

  handleRemove(id) {
    this.props.removeItem(Number(id))
  }
  handleSubmit() {
    this.props.submitOrder()
  }
  handleChange(id, event) {
    console.log(event.target)
    this.props.updatingCart(Number(id), Number(event.target.value))
  }
  render() {
    if (this.props.cart.length !== 0) {
      return (
        <Paper style={styles.paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="right">Activity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleChange={this.handleChange}
                  handleRemove={this.handleRemove}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell align="right" />
                <TableCell align="right" />
                <TableCell align="right" />
                <TableCell align="right">Total:</TableCell>
                <TableCell align="right">
                  ${this.props.cart.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Button
            style={styles.button}
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit Order
          </Button>
        </Paper>
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
