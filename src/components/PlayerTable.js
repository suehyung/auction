import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TablePagination from '@material-ui/core/TablePagination'
import PlayerTableToolbar from './PlayerTableToolbar'
import PlayerTableHead from './PlayerTableHead'
import { Countdown, ShowPrice } from './Formatting'
import CheckWatchlist from './CheckWatchlist'

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
      return a[orderBy] < b[orderBy] ? 1 : -1
    }
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1
    }
  }
}

function ActiveTableBody (props) {
  const { players, order, orderBy, page, rowsPerPage, onSelect, selectedMenu, bidder } = props

  return (
    <tbody className='list-container'>
      {stableSort(players, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(player => {return player.position.includes(selectedMenu.position)})
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
  const { players, order, orderBy, page, rowsPerPage, onSelect, selectedMenu } = props

  return (
    <tbody className='list-container'>
      {stableSort(players, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter(player => {return player.maxbidder !== null}) 
        .filter(player => {return player.maxbidder.includes(selectedMenu.team)})
        .map(player => {
          return (
            <tr className='list-row' key={player.id}>
              <td className='list-name' onClick={onSelect.bind(null, player)}>
                <p>{player.name}</p>
              </td>
              <td className='list-closes'>{player.maxbidder}</td>
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
    this.updateMenu = this.updateMenu.bind(this)
    this.state = {
      order: 'asc',
      orderBy: 'name',
      page: 0,
      rowsPerPage: 10,
      selectedMenu: {position: '', team: ''}
    }
  }

  componentDidMount () {
    this.updateMenu(this.state.selectedMenu)
  }

  updateMenu (menuitem) {
    this.setState(() => {
      return {
        selectedMenu: menuitem
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
    const { order, orderBy, rowsPerPage, page, selectedMenu } = this.state

    return (
      <div>
        <PlayerTableToolbar onMenuSelect = {this.updateMenu}
        selectedMenu = {this.state.selectedMenu}/>
        <div className={classes.tableWrapper}>
          <table className={classes.table} aria-labelledby="tableTitle">
            <PlayerTableHead
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
                selectedMenu={selectedMenu}
              />
            : <ActiveTableBody 
                players={players}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
                bidder={bidder}
                onSelect={onSelect}
                selectedMenu={selectedMenu}
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

const styles = theme => ({
  table: {
    minWidth: 320,
    width: '100%',

  },
})

const StyledTable = withStyles(styles)(PlayerTable)

// wrap with router to use location prop
export default withRouter(StyledTable)
