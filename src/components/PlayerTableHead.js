import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'

// Table headers and Material UI style settings
const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'closingtime', numeric: false, disablePadding: true, label: 'Closing' },
  { id: 'price', numeric: true, disablePadding: true, label: 'Price' }
]

const rowsClosed = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'maxbidder', numeric: false, disablePadding: true, label: 'Team' },
  { id: 'price', numeric: true, disablePadding: true, label: 'Price' }
]

// Table header component
class PlayerTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy, location } = this.props

    return (
      <thead>
        <tr className='list-title'>
          {(location.pathname === '/closed' ? rowsClosed : rows).map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title='Sort'
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </tr>
      </thead>
    )
  }
}

PlayerTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

// Wrap with router to use location prop
export default withRouter(PlayerTableHead)
