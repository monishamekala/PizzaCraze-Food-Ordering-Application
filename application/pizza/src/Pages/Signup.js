import React, { useState } from 'react';
import BannerImage from '../Assests/pizza.jpeg';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginlogo from '../Assests/eye.svg';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    username: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeForPassword = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    const password = e.target.value;

    //To get the length of password entered
    const lengthValid = password.length >= 8;

    // To display message
    const passwordErrorElement = document.getElementById('password-error');

    // Test the password for each criterion
    if (!lengthValid) {
      passwordErrorElement.textContent = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(password)) {
      passwordErrorElement.textContent = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      passwordErrorElement.textContent = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(password)) {
      passwordErrorElement.textContent = 'Password must contain at least one digit';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      passwordErrorElement.textContent = 'Password must contain at least one special character';
    } else {
      passwordErrorElement.textContent = '';
    }

    setUser((prev) => ({ ...prev, [e.target.id]: password }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Check password strength before submitting
    const password = user.password;
    const containsUpperCase = /[A-Z]/.test(password);
    const containsLowerCase = /[a-z]/.test(password);
    const containsNumbers = /\d/.test(password);
    const containsSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;

    // validating phone number
    const phoneNo = user.phone;
    const checkPhone = /^[0-9]{10}$/.test(phoneNo);

    // validating Full name field
    const name = user.username;
    const checkName = /^[A-Za-z\s]{3,}$/.test(name);

    // if full name, password, and phone number are in correct format
    if (checkName && checkPhone && containsUpperCase && containsLowerCase && containsNumbers && containsSpecialChars && isLengthValid) {
      try {
        const urlHI = '/api/UserController/PostUsers';
        const response = await axios.post(process.env.REACT_APP_API_URL.concat(urlHI), user);

        // To display the result of registration
        if (response.data.result === "Success") {
          // Replace alert with toast.success
          toast.success(response.data.message);
          navigate('/login');
        }else{
          toast.error(response.data.message);
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          // The error message is in err.response.data.error
          // Replace alert with toast.error
          toast.error(err.response.data.error);
        } else {
          // If there's any other type of error
          console.error(err);
        }
      }
    } else if (!checkPhone) {
      // Replace alert with toast.error
      toast.error('Please enter a valid phone number');
    } else if (!checkName) {
      // Replace alert with toast.error
      toast.error('Please provide a valid name');
    } else {
      // Replace alert with toast.error
      toast.error('Password does not meet the required criteria.');
    }
  };

  return (
    <div className='contact'>
      <div className='leftSide' style={{ backgroundImage: `url(${BannerImage})` }}></div>
      <div className='rightSide'>
        <form onSubmit={handleClick}>
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' onChange={handleChange} required></input>

          <label htmlFor='username'>Full Name</label>
          <input id='username' type='text' onChange={handleChange} required></input>

          <label htmlFor='phone'>Phone Number</label>
          <input id='phone' onChange={handleChange} required></input>

          <label htmlFor='password'>Password</label>
          <div className='password'>
            <input type={showPassword ? 'text' : 'password'} id='password' onChange={handleChange} required></input>
            <button onClick={togglePasswordVisibility}>
              <img src={loginlogo} alt='Show/Hide Password'></img>
            </button>
          </div>

          <div id='password-error' style={{ color: 'red' }}></div>

          <br></br>

          <div className='signup-submit'>
            <button id='submit' type='submit'>
              Submit
            </button>
          </div>

          <div id='success-message'></div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
