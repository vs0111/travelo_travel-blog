import React, { useState } from 'react'
import './drop-down.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { setLogout } from "../../Redux/store";
import {  useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { Container } from 'reactstrap';




function DropDown() {
const dispatch=useDispatch()
const navigate = useNavigate();
const [show,setShow]=useState(false)

const logout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be Logout..",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout..'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Logout!',
        'Your file has been Logouted.',
        'success'
      )
      dispatch(setLogout())
      navigate('/')
  
    }
   
    
  })
    
  }
  return (
   <Container>
    <div className='drop flex flex-col'>
      <ul className='flex flex-col gap-2'>
        <li><Link to={'/profile'} style={{textDecoration:"none",color:"black",cursor:"pointer"}}>Profile</Link></li>
        <li><Link to={'/addBlog'} style={{textDecoration:"none",color:"black",cursor:"pointer"}}>Write</Link></li>
        <li><Link to={'/dashBoard'} style={{textDecoration:"none",color:"black",cursor:"pointer"}}>Dashboard</Link></li>
        <li onClick={logout} style={{cursor:"pointer"}}>Logout</li>
      </ul>
    </div>
    </Container>
 
  )
}

export default DropDown