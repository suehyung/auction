import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import PlayerTable from './PlayerTable'
import PlayerBid from './PlayerBid'

const PLAYERS_LIST = gql`
  {
    players {
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

class Positions extends Component {
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
      <Query query={PLAYERS_LIST}>
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
                  players={data.players}
                  bidder={this.props.userteam} />
              </div>
              <div className='rightpane'>
                <PlayerBid
                  onSelect={this.updatePlayer}
                  selectedPlayer={this.state.selectedPlayer}
                  bidder={this.props.userteam}
                  players={data.players} />
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Positions
