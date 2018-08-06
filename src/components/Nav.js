import React, { Component } from 'react'
import './Nav.css'

class Nav extends Component {
  render () {
    return (
      <div className='nav-container'>
        <div className='nav-title'>
          <div className='nav-title-light'>INTERNET BASEBALL LEAGUE</div>
          <div className='nav-title-dark'>PRESEASON AUCTION</div>
        </div>
      </div>
    )
  }
}

export default Nav
