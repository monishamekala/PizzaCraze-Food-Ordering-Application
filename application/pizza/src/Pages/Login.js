import React, { useState } from 'react';
import axios from 'axios';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import loginlogo from '../Assests/eye.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigte = useNavigate();

  const [users, setusers] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setusers((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const urlLogin = "/api/UserController/login";
      const response = await axios.post(
        process.env.REACT_APP_API_URL.concat(urlLogin),
        users,
        { withCredentials: true }
      );

      if (response.data.message === "Login successful") {
        toast.success("Login successful");
        const successMessageElement = document.getElementById("success-message");
        navigte("/menu");
        window.location.reload();
      } else {
        toast.error(response.data.Failmessage);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        // The error message is in err.response.data.error
        toast.error(err.response.data.error);
      } else {
        // If there's any other type of error
        console.error(err);
      }
    }
  };

  return (
    <div className='contact'>
      <div className='leftSide' style={{ backgroundImage: `url(${BannerImage})` }}></div>
      <div className='rightSide'>
        <form onSubmit={handleClick}>
          <h1>Login</h1>
          <label htmlFor='email'>Email</label>
          <input id='email' onChange={handleChange} type='email' required></input>
          <label htmlFor='password'>Password</label>
          <div className='password'>
            <input type={showPassword ? 'text' : 'password'} id='password' onChange={handleChange} required></input>
            <button onClick={togglePasswordVisibility}><img src={loginlogo} alt="eye icon"></img></button>
          </div>
          <div className='submitsection'>
            <button className='normalbutton' type='submit'>
              Log In
            </button>
            <Link to='/forgotPassword'>Forgot Password?</Link>
          </div>
          <div className='newaccount'>
            <h1>Need an account?</h1>
            <Link to='/signup'>
              <button>Sign Up</button>
            </Link>
          </div>
        </form>
        <div id="success-message"></div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
