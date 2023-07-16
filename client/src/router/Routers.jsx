import React from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import Signup from '../pages/SignupPage/Signup'
import Home from '../pages/HomePage/Home'
import Login from '../pages/LoginPage/Login'
import Blogs from '../pages/BlogsPage/Blogs'
import Gallery from '../pages/GalleyPage/Gallery'
import AddBlog from '../pages/AddBlogPage/AddBlog'
import Dashboard from '../pages/DashboardPage/Dashboard'
import SinglePost from '../pages/SinglePost/SinglePost'
import EditBlog from '../pages/EditBlog/EditBlog'
import AuthorPage from '../pages/AuthorPage/AuthorPage'
import { useSelector } from 'react-redux'
import Messenger from '../pages/messenger/Messenger'
import Profile from '../pages/profile/Profile'



function Routers() {

  const token = useSelector(state => state.token)
  console.log(token);



  return (
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/blogs' element={<Blogs/>}/>
    <Route path='/gallery' element={<Gallery/>}/>
    <Route path='/addBlog' element={token?<AddBlog/>:<Login/>}/>
    <Route path='/dashboard' element={token?<Dashboard/>:<Login/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Signup/>}/>
    <Route path='/singlePost/:id' element={token?<SinglePost/>:<Login/>}/>
    <Route path='/editBlog/:id' element={token?<EditBlog/>:<Login/>}/>
    <Route path='/author/:id' element={token?<AuthorPage/>:<Login/>  }/>
    <Route path='/authorChat' element={token?<Messenger/>:<Login/>  }/>
    <Route path='/profile' element={token?<Profile/>:<Login/>}/>
  </Routes>

  )
}

export default Routers