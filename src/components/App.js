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

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { userteam: 'Arsenal' }
  }

  // componentDidMount () {
  //   this.updateUser(this.state.userteam)
  // }

  updateUser = (team) => {
    this.setState({ userteam: team })
  }

  render () {
    return (
      <Router>
        <div className='container'>
          <Nav onAuth={this.updateUser}/>
          <div className='body-container'>
            <Menu />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/positions' component={Positions} />
              <Route 
                path='/watchlist' 
                render={(props) => <Watchlist userteam={this.state.userteam} />}
              />
              <Route path='/closed' component={Closed} />
              <Route path='/account' component={Account} />
              <Route path='/login' component={Login} />
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
