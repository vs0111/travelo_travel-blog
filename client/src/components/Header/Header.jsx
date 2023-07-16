import React, { useRef, useEffect, useState } from 'react'
import './header.css'
import { Container, Row, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import { setLogout } from "../../Redux/store";
import img from '../../assets/images/user.png'
import { useNavigate } from 'react-router-dom'
import DropDown from '../DropDown/DropDown'
import DropDown1 from '../AppDropDown/AppDropDown'
import axios from "../../utils/axios";



const nav_links = [
  {
    path: '/',
    display: 'Home'
  },
  {
    path: '/blogs',
    display: 'Blog'
  },
  {
    path: '/gallery',
    display: 'Gallery'
  },
  {
    path: '/addBlog',
    display: 'Write'
  },
  {
    path: '/authorChat',
    display: 'Chats'
  },
]



function Header() {
  const [show,setShow]=useState(false)
  const [chatExist,setChatExist]=useState(false)
  
  const headerRef = useRef(null)
  const navigate=useNavigate()

  const StickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')

      }
    })
  }


  useEffect(() => {
    StickyHeaderFunc()

    return window.removeEventListener('scroll', StickyHeaderFunc)
  })


  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(setLogout())
    navigate('/')
  }

  useEffect(() => {
    const getConversation = async () => {
      const res = await axios.get(`/chat/getConversationCheck/${user._id}`);
      setChatExist(res.data.chatExist);
      console.log(res.data.chatExist);
      // setConversation(res.data);
    };
    getConversation();
  }, [user]);




  return <>
    <header className='header' ref={headerRef} >
      <Container>
        <Row>
          <div className="nav__wrappeter d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <div className='navigation'>
              <ul className="menu d-flex align-items-center gap-5">
                {
                  nav_links.map((item, index) => {
                    return (
                      <li className="nav__item" key={index}>
                        <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ""}>{item.display==="Chats"? chatExist && item.display:item.display}</NavLink>
                       
                      </li>
                    )
                  })
                }
                {/* <li>g</li> */}

              </ul>
            </div>
            <div className='nav__right d-flex align-items-center gap-4'>
              <div className="nav__btns d-flex align-items-center gap-4" onClick={()=>setShow(!show)}>
                {/* {
                  user ? <h5 style={{ fontFamily: "-moz-initial" }}><b> {user.name}</b></h5> : <Button className='btn secondary__btn '><Link to='/login' style={{ fontFamily: "-moz-initial" }}>Login</Link></Button>

                }
                {
                  user?                <Button className='btn' style={{background:"#0b2727"}}>
                  <b style={{ fontFamily: "-moz-initial" }} onClick={logout}>Logout</b></Button>:

                <Button className='btn primary__btn'>
                  <b style={{ fontFamily: "-moz-initial" }}><Link to='/register'>Register</Link></b></Button>
                } */}
               {
                !user || !user.photo ?<img className='pic' src={img} alt="" /> :
                <img className='pic' src={user.photo} alt="" />
                
               }
               {
                user?<h6 className='mt-2'><b>{user.name}</b></h6>:
                <h6 className='mt-2' >Account</h6>
               }
               
          

              </div>
              <span className="mobile__menu">
                <GiHamburgerMenu />
              </span>
            </div>

          </div>
        </Row>
          <Container>
        {
         user && show && <DropDown  />
       
        }
        {
          !user && show && <DropDown1/>
        }
        </Container>
      </Container>
    </header>
  </>
}

export default Header