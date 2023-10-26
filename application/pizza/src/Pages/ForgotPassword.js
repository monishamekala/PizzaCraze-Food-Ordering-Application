import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BannerImage from '../Assests/pizza.jpeg';

function ForgotPassword() {

    const [users, setusers] = useState({
        email: ""
    });

    const handleChange = (e) => {
        setusers(prev => ({...prev, [e.target.id]: e.target.value}))
    };

    const handleVerify = async e => {
        e.preventDefault()
          try{
            const urlforgotPassword = "/api/UserController/forgot-password"
            const response = await axios.post(process.env.REACT_APP_API_URL.concat(urlforgotPassword), users, {withCredentials: true});
            
            if (response.data.message === "Please register/Sign up") {
    
              const successMessageElement = document.getElementById("success-message");
              
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
        <div className= "my-3 about">
            <div className='aboutTop' style={{backgroundImage: `url(${BannerImage})`}}></div>
            <div className='my-3 aboutBottom'>
                <input id='email' placeholder='Enter Email' type = 'email' onChange={handleChange} required></input>
                <button onClick={handleVerify}>Verify</button>
                <div id="success-message"></div>
            </div>
        
        </div>
    )
}

export default ForgotPassword
