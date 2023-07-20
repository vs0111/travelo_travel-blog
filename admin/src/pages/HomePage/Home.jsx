import {useEffect,useState}from 'react'
import './home.scss'
import SideBar from '../../components/sideBar/SideBar'
import NavBar from '../../components/navBar/NavBar'
import Widget from '../../components/widget/Widget'
import UserTable from '../../components/UserTable/UserTable'
import axios from "../../utils/axios";
import PopularAuthor from '../../components/PopularAuthor/PopularAuthor'


function Home() {
  const [dashBoardCount,setDashBoardCount]=useState("")   


  useEffect(()=>{
    const getHomeChartCount = async()=>{
     const res=await axios.get('/admin/getHomeChartCount')
     setDashBoardCount(res.data);
     console.log(res.data);
    }
    getHomeChartCount();
   },[])

  return (
      <div className='home'>
        <SideBar/>
        <div className="homeContainer">
          <NavBar/>
           <div className="widgets">
          <Widget type="user" count={dashBoardCount.userCount}  />
          <Widget type="authors"  count={dashBoardCount.authorCount} />
          <Widget type="blogs"   count={dashBoardCount.blogCount}/>
          <Widget type="reports"  count={dashBoardCount.reportCount} />
           </div>
          <h2 style={{margin:"20px"}}> <b> POPULAR AUTHORS</b></h2>
          <hr />
        <div><PopularAuthor/></div>
  
        </div>
      </div>
      )
}

export default Home