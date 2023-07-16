import React from 'react'
import './nav-bar.scss'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MenuIcon from '@mui/icons-material/Menu';



function NavBar() {
  return (
    <div className="navbar">
        <div className="wrapper">
            <div className="search">
                <input type="text" placeholder='Search...' />
                <SearchIcon/>
            </div>
            <div className="items">
                <div className="item">
                    <NotificationsActiveIcon className='icon'/>
                    Notification
                </div>
                <div className="item">
                    <NotificationsActiveIcon  className='icon'/>
                    Notification
                </div>
                <div className="item">
                    <NotificationsActiveIcon  className='icon'/>
                    <div className="counter">1</div>                  
                </div>
                <div className="item">
                    <NotificationsActiveIcon  className='icon'/>
                    <div className="counter">1</div>
                </div>
                <div className="item">
                    <MenuIcon className='icon'/>
                    MENU
                </div>
                <div className="item">
                  <img src='#' alt="ava" />
                </div>
            </div>
        </div>
    </div>
  )
}


export default NavBar