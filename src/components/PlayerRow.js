import React from 'react'
import Countdown from './Countdown'
import PropTypes from 'prop-types'
import ShowPrice from './ShowPrice'
import { getUser } from './User'

PlayerRow.propTypes = {
  players: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

// Add toggle on click function to add/remove watchlist array element
function CheckWatchlist (props) {
  const userId = getUser()
  return (
    props.user.find(user => user.user.id === userId)
      ? <div className='heart'></div>
      : <div className='no-heart'></div>
  )
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
              {player.name}
            </div>
            <div className='list-heart'>
              <CheckWatchlist user = {player.watchlist} />
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
