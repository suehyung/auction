import React from 'react'
import Countdown from './Countdown'
import ShowPrice from './ShowPrice'
import { getUser } from './User'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'

const TOGGLE_WATCHLIST = gql`
  mutation ToggleWatchlist($playerId: String!) {
    watchlist(playerId: $playerId) {
      id
    }
  }
`
const userId = getUser()

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
    const ToggleMutation =
      <Mutation
        mutation = {TOGGLE_WATCHLIST}
        variables = {{playerId}}
        onClick = {this.updateToggle} // onClick would be faster
      >
        {mutation => (<div onClick={ mutation }> </div>)}
      </Mutation>

    return (
      this.state.toggle === true
        ? <div className='heart watchlist' >{ToggleMutation}</div>
        : <div className='no-heart watchlist' >{ToggleMutation}</div>
    )
  }
}

PlayerRow.propTypes = {
  players: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
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
