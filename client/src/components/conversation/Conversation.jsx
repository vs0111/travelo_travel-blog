import './conversation.css'
import img from '../../assets/images/ava-3.jpg'
import { useEffect, useState } from 'react'
import axios from "../../utils/axios";


function Conversation({conversation,currentUser}) {


const [user,setUser]=useState({})

useEffect(()=>{
    const AuthorId=conversation.members.find(m=>m !== currentUser._id)

    const getUser=async()=>{
      const res=await axios.get(`/getUser/${AuthorId}`)
      setUser(res.data);
    }
    getUser()

},[conversation,currentUser])



console.log(user);


  return (
    <div className='conversation'>
        <img src={user.photo} className='conversationImg' alt="" />
        <span className='conversationName  '>{user?.name}</span>
    </div>
  )
}

export default Conversation