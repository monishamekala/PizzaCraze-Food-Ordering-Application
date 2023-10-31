import React, { useState } from 'react';
import axios from 'axios';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigte = useNavigate();

  const [users, setusers] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setusers(prev => ({...prev, [e.target.id]: e.target.value}))
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleClick = async e => {
    e.preventDefault()
      try{
        const urlLogin = "/api/UserController/login"
        const response = await axios.post(process.env.REACT_APP_API_URL.concat(urlLogin),users, {withCredentials: true});
        
        if (response.data.message === "Login successful") {

          const successMessageElement = document.getElementById("success-message");
          navigte("/menu");
          window.location.reload();
          alert("You can now add to your cart");
          
          if (successMessageElement) {
            successMessageElement.textContent = response.data.message;
          }

        }else{
          const successMessageElement = document.getElementById("success-message");
          
          if (successMessageElement) {
            successMessageElement.textContent = response.data.Failmessage;
          }
        }
      }
      catch(err){
        if (err.response && err.response.data && err.response.data.error) {
          // The error message is in err.response.data.error
          alert(err.response.data.error);
        } else {
          // If there's any other type of error
          console.error(err);
        }
      }
  }; 

  return (
    <div className='contact'>
        <div className='leftSide' style={{backgroundImage: `url(${BannerImage})`}}>

        </div>
        <div className='rightSide'>
            <form onSubmit = {handleClick}>
              <h1>Login</h1>
                <label htmlFor='email'>Email</label>
                <input id='email' placeholder='Enter Email' onChange={handleChange} type = 'email' required></input>
                <label htmlFor='password'>Password</label>
                <input type={showPassword ? 'text' : 'password'} id='password' placeholder='Enter Password' onChange={handleChange} required></input>
                <input type="checkbox" onChange={togglePasswordVisibility}></input>Show Password
                <Link to = '/forgotPassword'>Forgot Password?</Link>
                <button type='submit'>Submit</button>  
            </form>
            <Link to = '/signup'>Create an account?</Link>
            <div id="success-message"></div>


            {/* id, name, value */}
        </div>
    </div>
  )
};

export default Login
