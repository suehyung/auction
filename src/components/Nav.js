import React from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getToken, removeToken } from '../utils/User'

function Nav (props) {
  return (
    <div className='title-container'>
      <div className='title'>
        <div className='title-light'>INTERNET BASEBALL LEAGUE</div>
        <div className='title-dark'>PRESEASON AUCTION</div>
      </div>
      <div className='title-login'>
        {getToken()
          ? <div onClick={() => {
            removeToken()
            props.onAuth.bind(null, null)
            props.history.push(`/`)
          }}>
            <b>Logout</b> ({props.userteam})
          </div>
          : <NavLink to='/login'>Login</NavLink>
        }
      </div>
    </div>
  )
}

export default withRouter(Nav)
