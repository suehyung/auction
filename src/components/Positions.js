import React, { Component } from 'react'
import PlayerRow from './PlayerRow'

// temp player values
const listOfPlayers = [
  {name: 'Max Scherzer', heart: false, closingtime: '12d 13h 36m', price: '$12.40'},
  {name: 'Madison Bumgarner', heart: false, closingtime: '12d 13h 36m', price: '$9.40'},
  {name: 'Clayton Kershaw', heart: false, closingtime: '12d 13h 36m', price: '$11.80'},
  {name: 'Shohei Ohtani', heart: false, closingtime: '12d 13h 36m', price: '$10.60'},
  {name: 'James Paxton', heart: true, closingtime: '12d 13h 36m', price: '$10.00'},
  {name: 'Charlie Morton', heart: true, closingtime: '12d 13h 36m', price: '$2.40'},
  {name: 'Noah Syndergaard', heart: false, closingtime: '12d 13h 36m', price: '$.80'},
  {name: 'Jake deGrom', heart: false, closingtime: '15d 13h 36m', price: '$.00'},
  {name: 'Carlos Carrasco', heart: false, closingtime: '15d 13h 36m', price: '$10.40'},
  {name: 'Felix Hernandez', heart: false, closingtime: '15d 13h 36m', price: '$12.20'},
  {name: 'German Marquez', heart: false, closingtime: '15d 13h 36m', price: '$5.00'}
]

class Positions extends Component {
  render () {
    return (
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
        <PlayerRow players = {listOfPlayers} />
      </div>
    )
  }
}

export default Positions
