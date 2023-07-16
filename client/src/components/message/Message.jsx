import './message.css'
import { useEffect,useState } from "react";
import {format} from "timeago.js"
import { useSelector } from 'react-redux';
import axios from "../../utils/axios";


function Message({messages,own,conversation,currentUser}) {
  const userPhoto=useSelector((state)=>state.user.photo)
  const [author,setAuthor]=useState({})

useEffect(()=>{
    const AuthorId=conversation.members?.find(m=>m !== currentUser._id)
    console.log(AuthorId);

    const getUser=async ()=>{
      const res=await axios.get(`/getUser/${AuthorId}`)
      setAuthor(res.data);
    }
    getUser()

},[])

console.log(author)

  return (
    <div className={own? "message own" : "message"}>
        <div className="messageTop">
           {
            own?
             <img className='messageImg' src={userPhoto} alt="" />:

              <img className='messageImg' src={author.photo} alt="" />
           }
            <p className='messageText'>{messages.text}</p>
        </div>
        <div className="messageBottom">{format(messages.createdAt)}</div>
    </div>
  )
}

export default Message