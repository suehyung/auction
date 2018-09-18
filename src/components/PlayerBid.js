import React from 'react'
import PropTypes from 'prop-types'
import Countdown from './Countdown'
import ShowPrice from './ShowPrice'

PlayerBid.propTypes = {
  selectedPlayer: PropTypes.object.isRequired
}

function PlayerBid (props) {
  return (
    props.selectedPlayer !== null
      ? <div className='bid-container'>
        <svg height='36px' width='36px' className='close-window' version='1.1' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
          <path d='M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z' fill='gray' />
        </svg>
        <div className='white box'>
          <div className='player-name'>{props.selectedPlayer.name}</div>
          <div className='player-team'>{props.selectedPlayer.team}</div>
          <div className='player-team bold'>{props.selectedPlayer.position}</div>
        </div>
        <div className='darkpurple box'>
          <div className='closing-time'>
            <Countdown closingtime = {props.selectedPlayer.closingtime} />
          </div>
          (or 1m after last bid)
          <div className='current-price'>
            <ShowPrice price = {props.selectedPlayer.price} />
          </div>
          <div className='bidder'>{props.selectedPlayer.maxbidder}</div>
        </div>
        <div className='player-photo'>
          <div className='photo-resize'></div>
        </div>
        <form className='bid-form'>
          <label for='enter-bid'>Enter your bid</label>
          <div className='dollar'>
            <i>$</i>
            <input
              type='number'
              step='.20' min='.40' max='40.00'
              id='enter-bid'
              placeholder='.40'/>
          </div>
          <input type='submit' value='PLACE BID' className='bid-button' />
        </form>
      </div>
      : <div className='bid-container'></div>
  )
}

export default PlayerBid
