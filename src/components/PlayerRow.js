import React from 'react'
import Countdown from './Countdown'
import ShowPrice from './ShowPrice'
import { getUser } from './User'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'

PlayerRow.propTypes = {
  players: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

const TOGGLE_WATCHLIST = gql`
  mutation ToggleWatchlist($playerId: String!) {
    watchlist(playerId: $playerId) {
      id
    }
  }
`

// Add toggle on click function to add/remove watchlist array element
class CheckWatchlist extends React.Component {
  constructor (props) {
    super(props)
    this.state = { toggle: false }
    this.updateToggle = this.updateToggle.bind(this)
  }

  componentDidMount () {
    this.updateToggle()
  }

  // make it so that on complete, props.user into CheckWatchlist is updated
  updateToggle () {
    this.setState(() => {
      return {
        toggle: !this.state.toggle
      }
    })
  }

  render () {
    const userId = getUser()
    const playerId = this.props.id

    return (
      <Mutation
        mutation = { TOGGLE_WATCHLIST }
        variables = {{playerId}}
        onCompleted = {this.updateToggle}
      >
        {mutation => (
          this.props.user.find(user => user.user.id === userId)
            ? <div className='heart watchlist' onClick = { mutation }></div>
            : <div className='no-heart watchlist' onClick = { mutation }></div>
        )}
      </Mutation>
    )
  }
}

function PlayerRow (props) {
  return (
    <ul className='list-container'>
      {props.players.map(player => {
        return (
          <li
            className='list-row'
            key={player.name}>
            <div className='list-name'
              onClick = {props.onSelect.bind(null, player)}>
              <p>{player.name}</p>
            </div>
            <div className='list-heart'>
              <CheckWatchlist
                user = {player.watchlist}
                id = {player.id} />
            </div>
            <div className='list-closes'>
              <Countdown closingtime = {player.closingtime} />
            </div>
            <div className='list-price'>
              <ShowPrice price = {player.price} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default PlayerRow
