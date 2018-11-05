import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { getToken, getUser, removeToken } from './User'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const userId = getUser()

const USER_TEAM = gql`
  query GetUser($userId: String) {
    getuser (id: $userId) {
      team
    }
  }
`

class Nav extends Component {
  render () {
    const { onAuth } = this.props

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
              this.props.history.push(`/`)
            }}>
              <b>Logout</b> (
              <Query
                query={USER_TEAM}
                variables={{userId}}
              >
                {({ error, loading, data }) => {
                  if (error) return (
                    <span>`Oops! ${error.message}`</span>
                  )
                  if (loading) return (
                    <span>Loading...</span>
                  )
                  onAuth.bind(null, data.getuser.team)
                  return <span>{data.getuser.team}</span>
                }}
              </Query>)
            </div>
            : <NavLink to='/login'>Login</NavLink>
          }
        </div>
      </div>
    )
  }
}

export default Nav
