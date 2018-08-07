import React, { Component } from 'react'

class Home extends Component {
  render () {
    return (
      <div className='main-container'>
        <div className='leftpane'>
          <div className='drop-menu'>
            <select className='dropdown purple'>
              <option value=''>POSITION</option>
              <option value='C'>C</option>
              <option value='1B'>1B</option>
              <option value='2B'>2B</option>
              <option value='SS'>SS</option>
              <option value='3B'>3B</option>
              <option value='CF'>CF</option>
              <option value='OF'>OF</option>
              <option value='DH'>DH</option>
              <option value='SP'>SP</option>
              <option value='RP'>RP</option>
            </select>
          </div>
          <div className='text'><h2>Welcome</h2>To start, select a position above. You can sort by name, closing date, or price, and filter by closing round.</div>
          <div className='text'><h2>Tips</h2>Winning bids will be highlighted:
            <div className='player-row highlight'></div>
            Bidding on a player will automatically add them to your Watchlist. Tap or click on the heart to add/remove a player from your Watchlist:
            <div className='player-row grey'></div>
          </div>
          <div className='text'><h2>Bidding Rules</h2>
            <ul>
              <li>Enter your maximum bid and the auction will automatically bid for you up to that maximum, so the price will be the 2nd highest bid plus the bid increment</li>
              <li>Bid in $.20 increments only; minimum bid is $.40</li>
              <li>In the event of identical bids, the earlier bid wins</li>
              <li>Don't wait to bid last minute, as you might be outbid by existing maximum bids, and also miss out on bidding for comparable players</li>
              <li>All bids are final</li>
            </ul>
          </div>
        </div>
        <div className='rightpane'></div>
      </div>
    )
  }
}

export default Home
