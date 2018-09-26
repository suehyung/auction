import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $team: String!) {
    signup(email: $email, password: $password, team: $team) {
      token
    }
  }
`

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      team: ''
    }
  }

  render () {
    const { email, password, team } = this.state

    return (
      <div className='main-container'>
        <div className='leftpane'>
          <h4>Sign Up</h4>
          <div className = 'login-box'>
            <input
              value={team}
              onChange={e => this.setState({ team: e.target.value })}
              type='text'
              placeholder='Team Name'
              className = 'login-input'
            />
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type='text'
              placeholder='Email address'
              className = 'login-input'
            />
            <input
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              type='password'
              placeholder='Password'
              className = 'login-input'
            />
          </div>
          <div className = 'login-box'>
            <Mutation
              mutation={SIGNUP_MUTATION}
              variables={{ email, password, team }}
            >
              {mutation => (
                <div
                  className = 'button login-button'
                  onClick = {mutation}>
                  Create Account
                </div>
              )}
            </Mutation>
          </div>
        </div>
        <div className='rightpane'> </div>
      </div>
    )
  }
}

export default Login
