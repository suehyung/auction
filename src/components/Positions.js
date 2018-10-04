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
      maxbidder {team}
      watchlist {user{team}}
    }
  }
`

const CLOSINGTIME_DESC = gql`
  {
    players(orderBy: closingtime_DESC) {
      id
      name
      team
      position
      closingtime
      price
      maxbidder {team}
    }
  }
`

class Positions extends Component {
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
                {/* Separate function below? Move sort to title? */}
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

export default Positions
