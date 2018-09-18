import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import PlayerRow from './PlayerRow'
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
                <div className='drop-menu'>
                  <select className='dropdown drop-filter'>
                    <option value=''></option>
                    <option value='All'>All</option>
                    <option value='R1'>R1</option>
                    <option value='R2'>R2</option>
                    <option value='R3'>R3</option>
                    <option value='R4'>R4</option>
                  </select>
                  <select className='dropdown grey'>
                    <option value=''>SORT BY</option>
                    <option value='Name'>Name</option>
                    <option value=''>Closing</option>
                    <option value=''>Price</option>
                  </select>
                </div>
                <div className='list-title'>
                  <div className='list-title-name'>NAME</div>
                  <div className='list-closes'>CLOSES</div>
                  <div className='list-price'>PRICE</div>
                </div>
                <PlayerRow
                  onSelect = {this.updatePlayer}
                  players = {data.players} />
                {/* Consider filter by watchlist, then if position not blank, then show title and PlayerRow */}
              </div>
              <div className='rightpane'>
                <PlayerBid
                  onSelect = {this.updatePlayer}
                  selectedPlayer = {this.state.selectedPlayer} />
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Watchlist
