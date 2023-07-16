import React from 'react'
import './app-drop-down.css'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

function AppDropDown() {
  return (
    <Container>
    <div> 
       <div className='drop flex flex-col'>
    <ul className='flex flex-col gap-2'>
      <li><Link to={'/login'} style={{textDecoration:"none",color:"black",cursor:"pointer"}}>Login</Link></li>
      <li><Link to={'/register'} style={{textDecoration:"none",color:"black",cursor:"pointer"}}>Register</Link></li>
    </ul>
  </div>
  </div>
  </Container>
  )
}

export default AppDropDown