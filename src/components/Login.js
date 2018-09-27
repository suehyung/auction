import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../utils'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $team: String!) {
    signup(email: $email, password: $password, team: $team) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      email: '',
      password: '',
      team: '',
    }
  }
  
  render () {
    const { login, email, password, team } = this.state
    return (
      <div className='main-container'>
        <div className='leftpane'>
          <h4>{login ? 'Login' : 'Sign Up'}</h4>
          <div className = 'login-box'>
            {!login && (
              <input
                value={team}
                onChange={e => this.setState({ team: e.target.value })}
                type='text'
                placeholder='Team Name'
                className = 'login-input'
              />
            )}
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
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={{ email, password, team }}
              onCompleted={data => this._confirm(data)}
            >
              {mutation => (
                <div
                  className = 'button login-button' 
                  onClick = {mutation}>
                  {login ? 'LOGIN' : 'Create Account'}
                </div>
              )}
            </Mutation>
            <div
              className = 'button login-button'
              onClick = {() => this.setState({ login: !login })}>
              {login
                ? 'CREATE ACCOUNT'
                : 'Already have an account?'}
            </div>
          </div>
        </div>
        <div className='rightpane'> </div>
      </div>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default Login
