import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { AUTH_TOKEN } from '../utils'

class Nav extends Component {
  render () {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <div className='title-container'>
        <div className='title'>
          <div className='title-light'>INTERNET BASEBALL LEAGUE</div>
          <div className='title-dark'>PRESEASON AUCTION</div>
        </div>
        <div className='title-login'>
          {authToken ? (
            <div
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.push('/')
              }}
            >
              Logout
            </div>
          ) : (
            <NavLink to='/login'>
              Login
            </NavLink>
          )}
        </div>
      </div>
    )
  }
}

export default Nav
