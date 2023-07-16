import React from 'react'
import './manage-report.scss'
import SideBar from '../../components/sideBar/SideBar'
import NavBar from '../../components/navBar/NavBar'
import ReportTable from '../../components/ReportTable/ReportTable'

function ManageReport() {
  return (
    <>
    <div className="list">
      <SideBar/>
      <div className="listContainer">
        <NavBar/>
       <ReportTable/>
      </div>
    </div>

    </>
  )
}

export default ManageReport;