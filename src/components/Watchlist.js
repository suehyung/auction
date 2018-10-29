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
      maxbidder {team}
      fantraxid
      fangraphsid
      watchlist {user{team, id}}
    }
  }
`

class Watchlist extends Component {
  constructor (props) {
    super(props)
    this.updatePlayer = this.updatePlayer.bind(this)
    this.state = { selectedPlayer: null }
  }

  componentDidMount () {
    this.updatePlayer(this.state.selectedPlayer)
  }

  updatePlayer (player) {
    this.setState(() => {
      return {
        selectedPlayer: player
      }
    })
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
                  players={data.players} />
              </div>
              <div className='rightpane'>
                <PlayerBid
                  onSelect={this.updatePlayer}
                  selectedPlayer={this.state.selectedPlayer} />
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Watchlist
