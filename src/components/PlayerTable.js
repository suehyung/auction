import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Menu, MenuItem } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FilterListIcon from '@material-ui/icons/FilterList'
import { Countdown, ShowPrice } from './Formatting'
import CheckWatchlist from './CheckWatchlist'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const USER_TEAMS = gql`
  {
    users {
      id
      team
    }
  }
`

// Sorting functions below
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
  return function (a,b) { 
    if (a[orderBy] === null) {
      return 1
    }
    if (b[orderBy] === null) {
      return -1
    }
    if (a[orderBy] === b[orderBy]) {
      return 0
    }
    if (order === 'desc') {
      return (a[orderBy] < b[orderBy]) ? 1 : -1
    }
    if (order === 'asc') {
      return (a[orderBy] < b[orderBy]) ? -1 : 1
    }
  }
}

// List of options in the menu dropdown
const positions = [
  {value: '', display: 'All'},
  {value: 'C ', display: 'Catcher'},
  {value: '1B', display: 'First Base'},
  {value: '2B', display: 'Second Base'},
  {value: 'SS', display: 'Shortstop'},
  {value: '3B', display: 'Third Base'},
  {value: 'CF', display: 'Centerfield'},
  {value: 'OF', display: 'Outfield'},
  {value: 'DH', display: 'Designated Hitter'},
  {value: 'SP', display: 'Starting Pitcher'},
  {value: 'RP', display: 'Relief Pitcher'}
]

class EnhancedTableToolbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      anchorEl: null,
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose () {
    this.setState({ anchorEl: null })
  }

  render () {
    const { anchorEl } = this.state

    return (
      <div className='drop-menu'>
        <div className='position'>
          {this.props.location.pathname === '/closed'
            ? this.props.selectedPosition.team || 'All'
            : this.props.selectedPosition.display || 'All'}
        </div>
        <Tooltip title='Filter'>
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <button className='dropdown purple'
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup='true'
          onClick={this.handleClick}>
          {this.props.location.pathname === '/closed'
            ? 'TEAM'
            : 'POSITION'}
        </button>
        {this.props.location.pathname === '/closed'
        ? <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => this.setState({ anchorEl: null })}
          >
            <MenuItem key= {'All'} onClick={() => 
              {this.props.onPositionSelect({team: ''}); this.handleClose()}}>All
            </MenuItem>
            <MenuItem key= {'None'} onClick={() => 
              {this.props.onPositionSelect({team: 'None'}); this.handleClose()}}>None
            </MenuItem>
            <Query query={USER_TEAMS}>
              {({ loading, error, data }) => {
                if (loading) return (<div></div>) 
                if (error) return (<div>`Oops! ${error.message}`</div>)

                return (
                  data.users.map(user => {
                    return (
                      <MenuItem key= {user.id} onClick={() => 
                      {this.props.onPositionSelect(user); 
                      this.handleClose()}}>{user.team}
                      </MenuItem>
                    )
                  })          
                )
              }}
            </Query>
          </Menu>
        : <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => this.setState({ anchorEl: null })}
          >
            {positions.map(position => {
              return (
                <MenuItem key= {position.value} onClick={() => 
                {this.props.onPositionSelect(position); this.handleClose()}}>
                  {position.display}
                </MenuItem>
              )
            })}
          </Menu>
        }
      </div>
    )
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
})

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)
const TableToolbar = withRouter(EnhancedTableToolbar)

// Table headers and Material UI style settings
const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'watchlist', numeric: false, disablePadding: true, label: 'Watchlist' },
  { id: 'closingtime', numeric: false, disablePadding: true, label: 'Closing' },
  { id: 'price', numeric: true, disablePadding: true, label: 'Price' }
]

const rowsClosed = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'empty', numeric: false, disablePadding: true, label: '' },
  { id: 'team', numeric: false, disablePadding: true, label: 'Team' },
  { id: 'price', numeric: true, disablePadding: true, label: 'Price' }
]

class EnhancedTableHead extends Component {
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

EnhancedTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
}

const styles = theme => ({
  table: {
    minWidth: 320,
    width: '100%',

  },
})

// For use with closed auctions, maybe replace positions dropdown with teams
function ActiveTableBody (props) {
  const { players, order, orderBy, page, rowsPerPage, onSelect, selectedPosition, bidder } = props

  return (
    <tbody className='list-container'>
      {stableSort(players, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(player => {return player.position.includes(selectedPosition.value)})
        .map(player => {
          return (
            <tr className={player.maxbidder === bidder 
              ? 'list-row highlight' 
              : 'list-row'} 
              key={player.id}>
              <td className='list-name' onClick={onSelect.bind(null, player)}>
                <p>{player.name}</p>
                <CheckWatchlist user={player.watchlist} id={player.id} />
              </td>
              <td></td>
              <td><Countdown closingtime={player.closingtime} /></td>
              <td className='list-price'>
                <ShowPrice price={player.price} />
              </td>
            </tr>
          )
        })
      }
    </tbody>
  )
}

function ClosedTableBody (props) {
  const { players, order, orderBy, page, rowsPerPage, onSelect, selectedPosition } = props

  return (
    <tbody className='list-container'>
      {stableSort(players, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(player => {return player.maxbidder.includes(selectedPosition.team)})
        .map(player => {
          return (
            <tr className='list-row' key={player.id}>
              <td className='list-name' onClick={onSelect.bind(null, player)}>
                <p>{player.name}</p>
              </td>
              <td></td>
              <td>{player.maxbidder}</td>
              <td className='list-price'>
                <ShowPrice price={player.price} />
              </td>
            </tr>
          )
        })
      }
    </tbody>
  )
}

class PlayerTable extends Component {
  constructor (props) {
    super(props)
    this.updatePosition = this.updatePosition.bind(this)
    this.state = {
      order: 'asc',
      orderBy: 'name',
      page: 0,
      rowsPerPage: 10,
      selectedPosition: {value: '', team: ''}
    }
  }

  componentDidMount () {
    this.updatePosition(this.state.selectedPosition)
  }

  updatePosition (position) {
    this.setState(() => {
      return {
        selectedPosition: position
      }
    })
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
    const { classes, players, onSelect, bidder, location } = this.props
    const { order, orderBy, rowsPerPage, page, selectedPosition } = this.state

    return (
      <div>
        <TableToolbar onPositionSelect = {this.updatePosition}
        selectedPosition = {this.state.selectedPosition}/>
        <div className={classes.tableWrapper}>
          <table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              location={location}
            />
            {location.pathname === '/closed'
            ? <ClosedTableBody 
                players={players}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                onSelect={onSelect}
                selectedPosition={selectedPosition}
              />
            : <ActiveTableBody 
                players={players}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                bidder={bidder}
                onSelect={onSelect}
                selectedPosition={selectedPosition}
              />
            }
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
  onSelect: PropTypes.func.isRequired,
  bidder: PropTypes.string,
  location: PropTypes.object.isRequired
}

const StyledTable = withStyles(styles)(PlayerTable)

// wrap with router to use location prop
export default withRouter(StyledTable)
