import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Login.css';

function Login() {
  
  //const [users, setusers] = useState( [] )
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

    // Check password strength before submitting
    
      try{
        const urlLogin = "/api/UserController/login"
        const response = await axios.post(process.env.REACT_APP_API_URL.concat(urlLogin),users);
        
        //To display the result of registration
        if (response.data.message) {
          const successMessageElement = document.getElementById("success-message");
  
          if (successMessageElement) {
            successMessageElement.textContent = response.data.message;
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
    } 




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
                <button type='submit'>Submit</button>
                
            </form>
            <div id="success-message"></div>

        </div>
    </div>
  )
};

export default Login
