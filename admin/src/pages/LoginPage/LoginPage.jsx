import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login-page.scss'
import axios from '../../utils/axios'
import { useDispatch } from 'react-redux'; 
import { setLogin } from "../../Redux/store";
import { ToastContainer, toast } from 'react-toastify';


function LoginPage() {




  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [error,setError]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()



  const handleChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
    console.log(loginData);
  }
   
  const handleSubmit = async e => {
    e.preventDefault()
      axios.post('/admin/login',loginData).then((response)=>{
        console.log(response);
      
         
          dispatch(setLogin({admin:response.data.admin, token:response.data.token}))
          navigate("/");
        
       
      }).catch((err)=>{
       console.log(err.response.data.message);
       setError(err.response.data.message)
      })

   
     }


  return (
   <>
     {/* <ToastContainer/> */}
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          {
            error?<p style={{color:"Red",paddingRight:"200px"}}>{error}</p>:""
          }
          <form className="form_container" onSubmit={handleSubmit} >
         
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
              className="input"
            />
            {/* {error && <div className={styles.error_msg}>{error}</div>} */}
            <button type="submit" className="green_btn">
              Login
            </button>
          </form>
        </div>
        <div className="rights">
        <h2>LOGIN TO ADMIN!</h2>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage
