import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const CartItem = props => {
  const item = props.item
  return (
    <TableRow key={item.id}>
      <TableCell>
        <ListItemAvatar>
          <Avatar alt={item.name} src={item.imageUrl} />
        </ListItemAvatar>
      </TableCell>
      <TableCell align="right">{item.name}</TableCell>
      <TableCell align="right">{item.price}</TableCell>
      <TableCell align="right">
        <TextField
          select
          id={`${item.id}`}
          name="quantity"
          type="number"
          value={item.quantity}
          onChange={event => props.handleChange(item.id, event)}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
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
