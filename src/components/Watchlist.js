import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import PlayerTable from './PlayerTable'
import PlayerBid from './PlayerBid'

// Need to refetch query each time component loads
const WATCHLIST_PLAYERS = gql`
  {
    watchplayers
    {
      id
      name
      team
      position
      closingtime
      price
      bids
      bidders
      bidtimestamp
      maxbidder
      maxbid
      fantraxid
      fangraphsid
      watchlist {user{team, id}}
    }
  }
`

class Watchlist extends Component {
  constructor (props) {
    super(props)
    this.state = { selectedPlayer: null }
  }

  componentDidMount () {
    this.updatePlayer(this.state.selectedPlayer)
  }

  updatePlayer = (player) => {
    this.setState({ selectedPlayer: player })
  }

  render () {
    return (
      <Query query={WATCHLIST_PLAYERS}>
        {({ error, loading, data }) => {
          if (error) return (
            <div className='leftpane'>
              `Oops! ${error.message}`
            </div>
          )
          if (loading) return (
            <div className='leftpane'>
              Patience young grasshopper...
            </div>
          )

          return (
            <div className='main-container'>
              <div className='leftpane'>
                <PlayerTable
                  onSelect={this.updatePlayer}
                  players={data.watchplayers}
                  bidder={this.props.userteam} />
              </div>
              <div className='rightpane'>
                <PlayerBid
                  onSelect={this.updatePlayer}
                  selectedPlayer={this.state.selectedPlayer}
                  bidder={this.props.userteam}
                  players={data.watchplayers} />
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Watchlist
