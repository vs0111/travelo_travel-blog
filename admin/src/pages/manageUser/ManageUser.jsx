import React from 'react'
import './manage-user.scss'
import SideBar from '../../components/sideBar/SideBar'
import NavBar from '../../components/navBar/NavBar'
import UserTable from '../../components/UserTable/UserTable'

function ManageUser() {
  return (
    <>
    <div className="list">
      <SideBar/>
      <div className="listContainer">
        <NavBar/>
       <UserTable/>
      </div>
    </div>

    </>
  )
}

export default ManageUser