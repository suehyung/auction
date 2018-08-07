import React from 'react'
import { NavLink } from 'react-router-dom'
import searchimg from '../img/search.svg'
import homeimg from '../img/home.svg'
import positionimg from '../img/positions.svg'
import watchlistimg from '../img/watchlist.svg'
import historyimg from '../img/history.svg'
import accountimg from '../img/account.svg'

function Menu () {
  return (
    <ul className='menu'>
      <li>
        <input type='text' className='search' placeholder='Player Search'></input>
        <button type='submit' className='search-button'>
          <img src={searchimg} alt='search icon'/>
        </button>
      </li>
      <li>
        <div className='icon-container'>
          <img src={homeimg} alt='home icon' className='menu-icon'/>
        </div>
        <NavLink exact activeClassName='active' to='/'>Home</NavLink>
      </li>
      <li>
        <div className='icon-container'>
          <img src={positionimg} alt='position icon' className='menu-icon'/>
        </div>
        <NavLink activeClassName='active' to='/positions'>Positions</NavLink>
      </li>
      <li>
        <div className='icon-container'>
          <img src={watchlistimg} alt='favorites icon' className='menu-icon'/>
        </div>
        <NavLink activeClassName='active' to='/watchlist'>Watchlist</NavLink>
      </li>
      <li>
        <div className='icon-container'>
          <img src={historyimg} alt='history icon' className='menu-icon'/>
        </div>
        <NavLink activeClassName='active' to='/history'>History</NavLink>
      </li>
      <li>
        <div className='icon-container'>
          <img src={accountimg} alt='account icon' className='menu-icon'/>
        </div>
        <NavLink activeClassName='active' to='/account'>Account</NavLink>
      </li>
    </ul>
  )
}

export default Menu
