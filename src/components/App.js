import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Account from './Account'
import Closed from './Closed'
import Home from './Home'
import Login from './Login'
import Menu from './Menu'
import Nav from './Nav'
import Positions from './Positions'
import Watchlist from './Watchlist'
import { getTeam } from '../utils/userAuth'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { userteam: getTeam() }
  }

  componentDidMount () {
    this.updateUser(this.state.userteam)
  }

  updateUser = (team) => {
    this.setState({ userteam: team })
  }

  render () {
    return (
      <Router>
        <div className='container'>
          <Nav logout={this.updateUser} userteam={this.state.userteam}/>
          <div className='body-container'>
            <Menu />
            <Switch>
              <Route exact path='/' 
                render={(props) => <Home userteam={this.state.userteam} />}
              />
              <Route path='/positions' 
                render={(props) => <Positions userteam={this.state.userteam} />}
              />
              <Route path='/watchlist' 
                render={(props) => <Watchlist userteam={this.state.userteam} />}
              />
              <Route path='/closed'
                render={(props) => <Closed userteam={this.state.userteam} />}
              />
              <Route path='/account' component={Account} />
              <Route path='/login' 
                render={(props) => <Login login={this.updateUser} />}
              />
              <Route render={function () {
                return <p>Page Not Found</p>
              }} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
