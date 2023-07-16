import React, { Fragment } from 'react'
import {useLocation} from 'react-router-dom'
import Header from '../Header/Header'
import Routers from '../../router/Routers'
import Footer from '../Footer/Footer'



function Layout() {
  const location =useLocation();
  const shouldShowFooter = location.pathname !== '/authorChat'; 

  return (
    <Fragment>
        <Header />
        <Routers />
        {shouldShowFooter && <Footer />}
    </Fragment>
   
  )
}

export default Layout