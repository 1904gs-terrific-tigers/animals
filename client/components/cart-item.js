import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import {makeStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import React from 'react'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(20),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
}))

const CartItem = props => {
  const classes = useStyles()
  const item = props.item
  const animalUrl = `/animals/${item.id}`
  return (
    <TableRow key={item.id}>
      <TableCell>
        <ListItemAvatar>
          <Avatar alt={item.name} src={item.imageUrl} />
        </ListItemAvatar>
      </TableCell>
      <TableCell align="right">
        <Link to={animalUrl}>{item.name}</Link>
      </TableCell>
      <TableCell align="right">{item.price}</TableCell>
      <TableCell align="right">
        <TextField
          className={classes.textField}
          id={`${item.id}`}
          name="quantity"
          type="number"
          value={item.quantity}
          onChange={event => props.handleChange(item.id, event)}
          InputLabelProps={{
            shrink: true,
            min: 1
          }}
          margin="normal"
          variant="outlined"
        />
      </TableCell>
      <TableCell align="right">{item.quantity * item.price}</TableCell>
      <TableCell align="right">
        <IconButton
          id={item.id}
          onClick={() => props.handleRemove(item.id)}
          type="submit"
        >
          <DeleteForeverRoundedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default CartItem
