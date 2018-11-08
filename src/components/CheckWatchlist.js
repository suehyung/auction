import React from 'react'
import { getUser } from './User'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'

const TOGGLE_WATCHLIST = gql`
  mutation ToggleWatchlist($playerId: String!) {
    watchlist(playerId: $playerId) {
      id
    }
  }
`
let userId = getUser()

// Add toggle on click function to add/remove watchlist array element
class CheckWatchlist extends React.Component {
  constructor (props) {
    super(props)
    this.state = { toggle: false }
    this.setToggle = this.setToggle.bind(this)
    this.updateToggle = this.updateToggle.bind(this)
  }

  componentDidMount () {
    this.setToggle()
  }

  // Issue is props.user into CheckWatchlist is not updated, search how to get parent to send new props to child
  setToggle () {
    this.props.user.find(user => user.user.id === userId)
      ? this.setState(() => { return { toggle: true } })
      : this.setState(() => { return { toggle: false } })
  }

  updateToggle () {
    this.setState(() => { return { toggle: !this.state.toggle } })
  }

  render () {
    const playerId = this.props.id
    console.log(userId)
    const ToggleMutation =
      <Mutation
        mutation = {TOGGLE_WATCHLIST}
        variables = {{playerId}}
        onCompleted = {this.updateToggle}
      >
        {mutation => (<div onClick={ mutation }> </div>)}
      </Mutation>

    return (
      userId === undefined
        ? <Tooltip title='Log in to favorite'>
          <div className='no-heart watchlist'></div>
        </Tooltip>
        : this.state.toggle === true
          ? <div className='heart watchlist' >{ToggleMutation}</div>
          : <div className='no-heart watchlist' >{ToggleMutation}</div>
    )
  }
}

CheckWatchlist.propTypes = {
  user: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
}

export default CheckWatchlist
