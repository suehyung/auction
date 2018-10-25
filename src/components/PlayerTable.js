import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FilterListIcon from '@material-ui/icons/FilterList'
import { Countdown, ShowPrice } from './Formatting'
import CheckWatchlist from './CheckWatchlist'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'watchlist', numeric: false, disablePadding: true, label: 'Watchlist' },
  { id: 'closingtime', numeric: false, disablePadding: true, label: 'Closing' },
  { id: 'price', numeric: true, disablePadding: true, label: 'Price' }
]

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy } = this.props

    return (
      <thead>
        <tr className='list-title'>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
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

EnhancedTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
})

let EnhancedTableToolbar = props => {
  // If/then looks at route to determine whether to render the position dropdown menu, and display current position  
  return (
      <div className='drop-menu'>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
  )
}

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)

const styles = theme => ({
  table: {
    minWidth: 340,
    width: '100%',

  },
})

class PlayerTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'name',
      page: 0,
      rowsPerPage: 10
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }
    this.setState({ order, orderBy })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { classes, players, onSelect } = this.props
    const { order, orderBy, rowsPerPage, page } = this.state

    return (
      <div>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={players.length}
            />
            <tbody className='list-container'>
              {stableSort(players, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(player => {
                  return (
                    <tr className='list-row' key={player.id}>
                      <td className='list-name'
                        onClick = {onSelect.bind(null, player)}>
                        <p>{player.name}</p>
                        <CheckWatchlist user={player.watchlist} id={player.id} />
                      </td>
                      <td></td>
                      <td className='list-closes'>
                        <Countdown closingtime={player.closingtime} />
                      </td>
                      <td className='list-price' >
                        <ShowPrice price={player.price} />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <TablePagination
          component="div"
          count={players.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    )
  }
}

PlayerTable.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default withStyles(styles)(PlayerTable)