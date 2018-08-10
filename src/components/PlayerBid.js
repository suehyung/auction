import React, { Component } from 'react'

class PlayerBid extends Component {
  render () {
    return (
      <div className='bid-container'>
        <div>Close Window</div>
        <div className='white box'>
          <div className='player-name'>Madison Bumgarner</div>
          <div className='player-team'>San Francisco Giants</div>
          <div className='player-team bold'>P, DH</div>
        </div>
        <div className='darkpurple box'>
          <div className='closing-time'>12d 20h 46m</div>
          (or 1m after last bid)
          <div className='current-price'>$12.40</div>
          <div className='bidder'>Rib Lake Badger Academy</div>
        </div>
        <div className='player-photo'>
          <div className='photo-resize'></div>
        </div>
        <form className='bid-form'>
          <label for='enter-bid'>Enter your bid</label>
          <input
            type='number'
            step='.20' min='.40' max='40' data-number-to-fixed='2' id='enter-bid'
            name='bid'
            placeholder='$.20 increments only'/>
          <input type='submit' value='PLACE BID' className='bid-button' />
        </form>
      </div>
    )
  }
}

export default PlayerBid
