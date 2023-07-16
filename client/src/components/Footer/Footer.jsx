import React from 'react'
import './footer.css'
import {Container,Row,Col,ListGroup,ListGroupItem} from 'reactstrap'
import {Link} from 'react-router-dom'
import logo from '../../assets/images/logo.png';
import {FiMapPin} from 'react-icons/fi'


const quik_links=[
  {
   path:'/',
   display:'Home'
  },
  {
   path:'/blogs',
   display:'Blog'
  },
  {
   path:'gallery',
   display:'Gallery'
  },

 ];

 const quik_links2=[
  {
   path:'/home',
   display:'Home'
  },
  {
   path:'/blog',
   display:'Blog'
  },
  {
   path:'gallery',
   display:'Gallery'
  },

 ]
 
 
 const year=new Date().getFullYear()

function Footer() {
  return <>
          {/* <hr /> */}
      <Row className='footer-row mt-5'>
        <Col lg='3'>
          <div className="logo mt-2">
            <img src={logo} alt="" />
            <p>"Explore the world, one adventure at a time. Start your journey today!", </p>
           <div className="social__links d-flex align-items-center gap-4">
            <span>
              <Link to='#'><i className="ri-youtube-fill"></i></Link>
            </span>
            <span>
              <Link to='#'><i className="ri-twitter-fill"></i></Link>
            </span>
            <span>
              <Link to='#'><i className="ri-facebook-circle-fill"></i></Link>
            </span>
            <span>
              <Link to='#'><i className="ri-facebook-circle-fill"></i></Link>
            </span>
            </div>    
          </div>
      
      
        </Col>
        <Col lg='3'>
            <h5 className="footer__link-title"></h5>
            <ul className='footer__quick-links '>
             {
                quik_links.map((item,index)=>
                    <li key={index} className='ps-0 border-0 mt-4'>
                        <Link to={item.path}>{item.display}</Link>
                    </li>
                )
             }
            </ul>
        </Col>
        <Col lg='3'>
        <h5 className="footer__link-title"></h5>
            <ul className='footer__quick-links'>
             {
                quik_links2.map((item,index)=>
                    <li key={index} className='ps-0 border-0 mt-4'>
                        <Link to={item.path}>{item.display}</Link>
                    </li>
                )
             }
            </ul>
        </Col>
        <Col lg='3'>
        <h5 className="footer__link-title">Contact</h5>
            <ListGroup className='footer__quick-links'>
             
              
                    <ListGroupItem indexclassName='ps-0 border-0 d-flex align-items-center gap-3'>
                    <h6 className='mb-0 d-flex align-items-center gap-2'>
                        <span><i class="ri-map-pin-fill"></i></span>
                        Address:
                    </h6>
                    <p className='mb-0'>Eranakulam Kerala-67676</p>
                    </ListGroupItem>
                    <ListGroupItem indexclassName='ps-0 border-0 d-flex align-items-center gap-3'>
                    <h6 className='mb-0 d-flex align-items-center gap-2'>
                        <span><i class="ri-mail-fill"></i></span>
                        Email:
                    </h6>
                    <p className='mb-0'>travelo57@gmail.com</p>
                    </ListGroupItem>
            </ListGroup>
        </Col>
        <Col lg='12' className='text-center'>
          <p className="compyright">Copyright {year},design and deveelop by TravelO Partners.All Right reserved</p>

        </Col>
                  
                    
                
             
      </Row>
  </>
}

export default Footer;