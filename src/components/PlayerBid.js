import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Countdown, ShowPrice, ShowDate } from './Formatting'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Tooltip from '@material-ui/core/Tooltip'

// Todo: use time instead of pathname to show closed in real time in right pane

const PLACE_BID = gql`
  mutation PlaceBid($playerId: String!, $bid: Float!, $bidder: String!) {
    placebid(playerId: $playerId, bid: $bid, bidder: $bidder) {
      id price bids bidders
    }
  }
`

// Displays player and price info
function PlayerInfo (props) {
  const { selectedPlayer, onSelect, location } = props

  return (
    <div>
      <svg height='36px' width='36px' className='close-window' version='1.1'
        viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'
        onClick={onSelect.bind(null, null)} >
        <path d='M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z' fill='gray' />
      </svg>
      <div className='white box'>
        <div className='player-name'>{selectedPlayer.name}</div>
        <div className='player-team'>{selectedPlayer.team}</div>
        <div className='player-team bold'>{selectedPlayer.position}</div>
      </div>
      <div className='darkpurple box'>
        {location.pathname === '/closed'
        ? <div className='closing-time'>Bidding is closed</div>
        : <div>
            <div className='closing-time'>Closes in&nbsp;
              <Countdown closingtime={selectedPlayer.closingtime} />
            </div>
            <div>(or 1m after last bid)</div>
          </div>
        }
        <div className='current-price'>
          <ShowPrice price={selectedPlayer.bids[0]} />
        </div>
        <div className='bidder'>{selectedPlayer.bidders[0]}</div>
      </div>
      <div className='player-photo'
        style={selectedPlayer.fantraxid !== null
          ? {backgroundImage: `url('https://img.fantrax.com/si/headshots/MLB/hs${selectedPlayer.fantraxid}_400_1.png')`}
          : {backgroundImage: null} }
      > 
        {selectedPlayer.fangraphsid !== null 
          ? <a href={'https://www.fangraphs.com/statss.aspx?playerid='+ selectedPlayer.fangraphsid} target='_blank' rel='noopener noreferrer' tabIndex='0'> 
            <div className='photo-resize'></div>
          </a>
          : <div className='photo-resize'></div>}
      </div>
    </div>
  )
}

// Displays bid history for a closed player
function BidHistory (props) {
  const { selectedPlayer } = props

  return (
    <div>
      {selectedPlayer.bids.length > 0
        ? <div className='history'>
          <div>{selectedPlayer.bidders.map((bidder, index) => {
            return <div key={index}>{bidder}</div>
            })}
          </div>
          <div>
            {selectedPlayer.bidtimestamp.map((timestamp, index) => {
              return <div key={index}><ShowDate timestamp={timestamp} /></div>
            })}
          </div>
          <div>
            {selectedPlayer.bids.map((bid, index) => {
              return <div key={index}><ShowPrice price={bid} /></div>
            })}
          </div>
          </div>
        : <div className='history'>No bids</div>
      }
    </div>
  )
}

class PlayerBid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bid: ''
    }
  }

  // Resets input form after click or submit
  resetInput = () => {
    this.setState({ bid: ''})
  }
  
  render () {
    const { bid } = this.state
    const { selectedPlayer, bidder, onSelect, location } = this.props
    let playerId = ''
    // let playerData = {}
    if (selectedPlayer !== null) {
      playerId = selectedPlayer.id
    }
    //   playerData = players.filter(player => { return player.id === playerId })
    // }

    return (
      selectedPlayer !== null
      ? <div className='bid-container'>
        <PlayerInfo 
          selectedPlayer={selectedPlayer}
          onSelect={onSelect}
          location={location}
        />
        {location.pathname === '/closed'
        ? <BidHistory selectedPlayer={selectedPlayer} />
        : <Mutation
            mutation={PLACE_BID}
            variables={{ playerId, bid, bidder }}
            onCompleted={this.resetInput}
          >
            {(mutation, {error, data}) => (
              <div className='box'>
                {error && <div className='error'>{error.message}</div>}
                <form className='bid-form' action='javascript:void(0)'
              // action above prevents page reload
                onSubmit={mutation}
              >
                
                <div className='dollar'>
                  <i>$</i>
                  <input
                    value={bid}
                    onChange={e => this.setState({ bid: e.target.value })}
                    type='number'
                    step='0.20' min='0.40' max='40.00'
                    id='enter-bid'
                    placeholder='0.40'
                  />
                </div>
                { bidder === undefined
                ? <Tooltip title='Log in to bid'>
                    <input className='button bid-button' value='PLACE BID' type='button'/>
                  </Tooltip>
                : <input className='button bid-button' onClick={mutation}
                  value='PLACE BID' type='button'/> }
              </form>
              </div>
            )}
          </Mutation>
        }
        </div>
      : <div className='bid-container'></div>
    )
  }
}

PlayerBid.propTypes = {
  selectedPlayer: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  userteam: PropTypes.string,
  location: PropTypes.object.isRequired
}

// wrap with router to use location prop
export default withRouter(PlayerBid)
