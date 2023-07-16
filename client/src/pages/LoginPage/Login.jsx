import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'
import loginImg from '../../assets/images/login.png'
import userIcon from '../../assets/images/user.png'
import axios from '../../utils/axios'
import { setUser,setToken } from "../../Redux/store";




function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" })

  const dispatch=useDispatch()
  const navigate=useNavigate()


  const handleChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
    console.log(loginData);
  }

  const handleSubmit = async e => {
    e.preventDefault()
    axios.post('/login',loginData).then((response)=>{
      
    
      dispatch(setUser({ user:response.data.user }))
      dispatch(setToken({ token:response.data.token }));
      localStorage.setItem("token",response.data.token);
      toast.success("Successfully Logined")
      setTimeout(()=> {
        window.location = "/";
      }, 1000);
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
   
   
  }



  return (
    <section>
      <ToastContainer/>
      <Container>
        <Row>
          <Col lg="8" className='m-auto' >
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />

                </div>
                <h2>Login</h2>
                <Form>
                  <FormGroup>
                    <input type="text" placeholder='Email' name='email' onChange={handleChange} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} required />
                  </FormGroup>
                  <Button onClick={handleSubmit} className='btn secondary__btn auth__btn' type='submit'>Login</Button>
                </Form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
              </div>
            </div>

          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login;