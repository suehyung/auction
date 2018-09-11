import React from 'react'
import Countdown from './Countdown'

function GetPrice (price) {
  let num = price[price.length - 1]
  return parseFloat(num).toFixed(2)
}

function PlayerRow (props) {
  return (
    <ul className='list-container'>
      {props.players.map(function (player, index) {
        return (
          <li
            className='list-row'
            key={player.name}>
            <div className='list-name'>
              {player.name}
              {player.watchlist === true
                ? <div className='heart'></div>
                : <div className='no-heart'></div>}
            </div>
            <Countdown closingtime = {player.closingtime} />
            {player.price[0]
              ? <div className='list-price'>&#36;{GetPrice(player.price)}</div>
              : <div className='list-price'></div>}
          </li>
        )
      })}
    </ul>
  )
}

// onClick <li>, select player object and pass it to PlayerBid as prop
// Add toggle on click for player.heart, consider separate function

export default PlayerRow
