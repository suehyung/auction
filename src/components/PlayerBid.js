import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Countdown, ShowPrice } from './Formatting'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const PLACE_BID = gql`
  mutation PlaceBid($playerId: String!, $bid: Float!, $bidder: String!) {
    placebid(playerId: $playerId, bid: $bid, bidder: $bidder) {
      id price bidder
    }
  }
`

// consider refactoring player info and bidding components for reuse

class PlayerBid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bid: ''
    }
  }

  // resets input form after click or submit
  resetInput = () => {
    this.setState({ bid: ''})
  }
  
  render () {
    const { bid } = this.state
    const { selectedPlayer, bidder, players } = this.props
    let playerId = ''
    let playerData = {}
    if (selectedPlayer !== null) {
      playerId = selectedPlayer.id
      playerData = players.filter(player => { return player.id === playerId })
    }

    return (
      selectedPlayer !== null
        ? <div className='bid-container'>
          <svg height='36px' width='36px' className='close-window' version='1.1'
            viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'
            onClick={this.props.onSelect.bind(null, null)} >
            <path d='M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z' fill='gray' />
          </svg>
          <div className='white box'>
            <div className='player-name'>{selectedPlayer.name}</div>
            <div className='player-team'>{selectedPlayer.team}</div>
            <div className='player-team bold'>{selectedPlayer.position}</div>
          </div>
          <div className='darkpurple box'>
            <div className='closing-time'>Closes in&nbsp;
              <Countdown closingtime={selectedPlayer.closingtime} />
            </div>
            (or 1m after last bid)
            <div className='current-price'>
              <ShowPrice price={playerData[0].price} />
            </div>
            <div className='bidder'>{playerData[0].bidder[0]}</div>
          </div>
          <div className='player-photo'
            style={(selectedPlayer.fantraxid !== null)
              ? {backgroundImage: `url('https://img.fantrax.com/si/headshots/MLB/hs${selectedPlayer.fantraxid}_400_1.png')`}
              : {backgroundImage: null} }>
            <div className='photo-resize'></div>
          </div>
          <Mutation
            mutation={PLACE_BID}
            variables={{ playerId, bid, bidder }}
            onCompleted={this.resetInput}
          >
            {mutation => (
              <form className='bid-form' action='javascript:void(0)'
              // action above prevents page reload
                onSubmit={mutation}
              >
                <label htmlFor='enter-bid'>Enter your bid</label>
                <div className='dollar'>
                  <i>$</i>
                  <input
                    value={bid}
                    onChange={e => this.setState({ bid: e.target.value })}
                    type='number'
                    step='.20' min='.40' max='40.00'
                    id='enter-bid'
                    placeholder='.40'
                  />
                </div>
                <input className='button bid-button' onClick={mutation}
                    value='PLACE BID' type='button'/>
              </form>
            )}
          </Mutation>
        </div>
        : <div className='bid-container'></div>
    )
  }
}

PlayerBid.propTypes = {
  selectedPlayer: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  userteam: PropTypes.string
}

export default PlayerBid
