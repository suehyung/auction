import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Menu, MenuItem } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

// Debugging note: default player.maxbidder must be 'None' not null for closed auctions with no bids to appear/sort correctly

// Query list of user teams
const USER_TEAMS = gql`
  {
    users {
      id
      team
    }
  }
`

// List of options in the menu dropdown
const positions = [
  {position: '', display: 'All'},
  {position: 'C ', display: 'Catcher'},
  {position: '1B', display: 'First Base'},
  {position: '2B', display: 'Second Base'},
  {position: 'SS', display: 'Shortstop'},
  {position: '3B', display: 'Third Base'},
  {position: 'CF', display: 'Centerfield'},
  {position: 'OF', display: 'Outfield'},
  {position: 'DH', display: 'Designated Hitter'},
  {position: 'SP', display: 'Starting Pitcher'},
  {position: 'RP', display: 'Relief Pitcher'}
]

// Toolbar component. Menu populates with teams for closed component, with positions for positions or watchlist components
class PlayerTableToolbar extends Component {
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
            ? this.props.selectedMenu.team || 'All'
            : this.props.selectedMenu.display || 'All'}
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
              {this.props.onMenuSelect({ team: '' });
              this.handleClose()}}>All
            </MenuItem>
            <MenuItem key= {'None'} onClick={() => 
              {this.props.onMenuSelect({ team: 'None' });
              this.handleClose()}}>None
            </MenuItem>
            <Query query={USER_TEAMS}>
              {({ loading, error, data }) => {
                if (loading) return (<div></div>) 
                if (error) return (<div>`Oops! ${error.message}`</div>)

                return (
                  data.users.map(user => {
                    return (
                      <MenuItem key= {user.id} onClick={() => 
                      {this.props.onMenuSelect(user); 
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
                <MenuItem key= {position.position} onClick={() => 
                {this.props.onMenuSelect(position); this.handleClose()}}>
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

PlayerTableToolbar.propTypes = {
  selectedMenu: PropTypes.object.isRequired,
  onMenuSelect: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
})

// Apply Material UI styling
const StyledToolbar = withStyles(toolbarStyles)(PlayerTableToolbar)

// Wrap with router to use location prop
export default withRouter(StyledToolbar)
