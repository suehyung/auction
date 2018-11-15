import React, { Component } from 'react'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = { toggle: false }
    this.updateToggle = this.updateToggle.bind(this)
  }

  updateToggle () {
    this.setState(() => { return { toggle: !this.state.toggle } })
  }

  render () {
    return (
      <div className='main-container'>
        <div className='leftpane'>
          <div className='text'><h2>Welcome, {this.props.userteam}</h2>To start, select a position. You can sort by name, closing date, or price, and filter by closing round.</div>
          <div className='text'><h2>Tips</h2>Winning bids will be highlighted:
            <div className='list-row highlight'>
              <div className='list-name'>
                <p>Sid Fernandez</p>
                {this.state.toggle === true
                  ? <div className='heart watchlist'
                    onClick={this.updateToggle}><div></div></div>
                  : <div className='no-heart watchlist'
                    onClick={this.updateToggle}><div></div></div>}
              </div>
              <div></div>
              <div className='list-closes'><div>6d 12h 34m</div></div>
              <div className='list-price'>$8.80</div>
            </div>
            <br></br>
            <div>Tap or click on the heart to add or remove a player from your Watchlist.</div>
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
        <div className='rightpane'> </div>
      </div>
    )
  }
}

export default Home
