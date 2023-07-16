import React, { useState } from 'react'
import './search-bar.css'
import { Col,Form,FormGroup } from 'reactstrap'
import {FiMapPin} from 'react-icons/fi'
import axios from "../../utils/axios";






export default function SearchBar() {
const [search,setSearch]=useState("")

const handleSubmit =  async(e)=>{
  e.preventDefault()
  // const res=await axi






}



  return <Col lg='12'>
 <div className='search__bar'>
  <Form className='d-flex align-items-center gap-4' >
    <FormGroup className='d-flex gap-3 form__group form__group-fast'>
      <span>
       <FiMapPin/>
      </span>
      <div>
        <h6>Location</h6>
        <input type="text" placeholder='Where are you going' 
        onChange={(e)=>setSearch(e.target.value)} 
        value={search}
        />
      </div>
    </FormGroup>
    <span className='search__icon' type='submit' onClick={handleSubmit}><i class="ri-search-line"></i></span>
  </Form>
 </div>
  </Col>
}
