import React, { Component } from 'react'
import Players from './Players'

class Positions extends Component {
  render () {
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
            <select className='dropdown white'>
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
        </div>
        <div className='rightpane'>
          <Players />
        </div>
      </div>
    )
  }
}

export default Positions
