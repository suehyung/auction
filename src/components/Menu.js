import React from 'react'
import { NavLink } from 'react-router-dom'
import search from '../img/search.svg'
import home from '../img/home.svg'
import position from '../img/positions.svg'
import watchlist from '../img/watchlist.svg'
import closed from '../img/closed.svg'
import account from '../img/account.svg'

const menuItems = [
  {img: home, alt: 'home', url: '/', text: 'Home'},
  {img: position, alt: 'position', url: '/positions', text: 'Positions'},
  {img: watchlist, alt: 'watchlist', url: '/watchlist', text: 'Watchlist'},
  {img: closed, alt: 'closed', url: '/closed', text: 'Closed'},
  {img: account, alt: 'account', url: '/account', text: 'Account'}
]

function Menu () {
  return (
    <ul className='menu'>
      <li>
        <input type='text' className='search' placeholder='Player Search'></input>
        <button type='submit' className='search-button'>
          <img src={search} alt='search icon'/>
        </button>
      </li>
      {menuItems.map(item => {
        return (
          <li key= {item.img}>
            <div className='icon-container'>
              <img src={item.img} alt={item.alt} className='menu-icon'/>
            </div>
            <NavLink exact activeClassName='active' to={item.url}
            >{item.text}</NavLink>
          </li>
        )
      })}
    </ul>
  )
}

export default Menu
