import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { getToken, getUser, removeToken } from './User'

class Nav extends Component {
  render () {
    return (
      <div className='title-container'>
        <div className='title'>
          <div className='title-light'>INTERNET BASEBALL LEAGUE</div>
          <div className='title-dark'>PRESEASON AUCTION</div>
        </div>
        <div className='title-login'>
          {getToken() ? (
            <div
              onClick={() => {
                removeToken()
                this.props.history.push(`/`)
              }}
            >
              Logout ({getUser()})
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
