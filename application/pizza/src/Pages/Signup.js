import React, { useState } from 'react';
import BannerImage from '../Assests/pizza.jpeg';
import axios from "axios";
import '../styles/Login.css';
// import { useNavigate } from 'react-router-dom';

function Signup() {
  const [user, setUser] = useState({
    email: "",
    phone: "",
    password: ""
  });

//const navigate = useNavigate()

  const handleChange = (e) => {
    setUser(prev => ({...prev, [e.target.id]: e.target.value}))
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeForPassword = (e) => {
    setUser(prev => ({...prev, [e.target.id]: e.target.value}));

    const password = e.target.value;

      //To get the length of password entered
      const lengthValid = password.length >= 8;

      // To display message 
      const passwordErrorElement = document.getElementById("password-error");

      // Test the password for each criteria
      if (!lengthValid) {
          passwordErrorElement.textContent = "Password must be at least 8 characters long";
      } else if (!/[A-Z]/.test(password)) {
          passwordErrorElement.textContent = "Password must contain at least one uppercase letter";
      } else if (!/[a-z]/.test(password)) {
          passwordErrorElement.textContent = "Password must contain at least one lowercase letter";
      } else if (!/[0-9]/.test(password)) {
          passwordErrorElement.textContent = "Password must contain at least one digit";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          passwordErrorElement.textContent = "Password must contain at least one special character";
      } else {
          passwordErrorElement.textContent = "";
      }
      
      setUser(prev => ({ ...prev, [e.target.id]: password }));
  };

  const togglePasswordVisibility = () => {
      setShowPassword(prev => !prev);
  };

  const handleClick = async e => {
    e.preventDefault()

    // Check password strength before submitting
    const password = user.password;
    const containsUpperCase = /[A-Z]/.test(password);
    const containsLowerCase = /[a-z]/.test(password);
    const containsNumbers = /\d/.test(password);
    const containsSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;

    if (containsUpperCase && containsLowerCase && containsNumbers && containsSpecialChars && isLengthValid) {
      try{
        const urlHI = "/api/UserController/PostUsers";
        const response = await axios.post(process.env.REACT_APP_API_URL.concat(urlHI),user);
        
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
    } else {
      alert("Password does not meet the required criteria.");
    }
  };

  return (
    <div className='contact'>
        <div className='leftSide' style={{backgroundImage: `url(${BannerImage})`}}>

        </div>
        <div className='rightSide'>
            <form onSubmit={handleClick}>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
                <label for ='email'>Email</label>
                <input id='email' type = 'email' placeholder='Enter Email' onChange={handleChange} required></input>

                <label for='phone'>Phone Number</label>
                <input id='phone' placeholder='Enter Phone Number' onChange={handleChange} required></input>

                <label for ='password'>Password</label>
                {/* <input type='Password' id='password' placeholder='Enter Password' onChange={handleChangeForPassword} required></input>
                */}

                <input type={showPassword ? 'text' : 'password'} id='password' placeholder='Enter Password' onChange={handleChangeForPassword} required></input>

                <input type="checkbox" onChange={togglePasswordVisibility}></input>Show Password
                <div id="password-error" style={{ color: 'red' }}></div>

                <br></br>
                
                <button type='submit'>Submit</button>

                <div id="success-message"></div>
            </form>
        </div>      
    </div>
  )
}

export default Signup
