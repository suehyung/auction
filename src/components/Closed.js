import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import PlayerTable from './PlayerTable'
import PlayerBid from './PlayerBid'

const CLOSED_PLAYERS = gql`
  {
    closedplayers {
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
      fantraxid
      fangraphsid
    }
  }
`

class Closed extends Component {
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
      <Query query={CLOSED_PLAYERS}>
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
            // modify playertable and replace playerbid with bidhistory
            <div className='main-container'>
              <div className='leftpane'>
                <PlayerTable
                  onSelect={this.updatePlayer}
                  players={data.closedplayers} />
              </div>
              <div className='rightpane'>
                <PlayerBid
                  onSelect={this.updatePlayer}
                  selectedPlayer={this.state.selectedPlayer}
                  bidder={this.props.userteam}
                  players={data.closedplayers} />
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Closed
