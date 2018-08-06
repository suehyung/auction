import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Account from './Account'
import BidHistory from './BidHistory'
import Home from './Home'
import Login from './Login'
import Menu from './Menu'
import Nav from './Nav'
import Positions from './Positions'
import Watchlist from './Watchlist'
import './App.css'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <div className='body-container'>
            <Menu />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/positions' component={Positions} />
              <Route path='/watchlist' component={Watchlist} />
              <Route path='/bidhistory' component={BidHistory} />
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
