import React from 'react'
import Countdown from './Countdown'
import PropTypes from 'prop-types'
import ShowPrice from './ShowPrice'

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
              {player.name}
            </div>
            <div className='list-heart'>
              {player.watchlist === true
                ? <div className='heart'></div>
                : <div className='no-heart'></div>}
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

// Add toggle on click for player.heart, consider separate function

export default PlayerRow
