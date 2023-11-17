import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerImage from '../Assests/pizza.jpeg';

function ForgotPassword() {
  const [users, setUsers] = useState({
    email: ""
  });

  const handleChange = (e) => {
    setUsers((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const urlforgotPassword = "/api/UserController/forgot-password";
      const response = await axios.post(
        process.env.REACT_APP_API_URL.concat(urlforgotPassword),
        users,
        { withCredentials: true }
      );

      if (response.data.message === "Please register/Sign up") {
        toast.success(response.data.message);
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
    <div className="my-3 about">
      <div className='aboutTop' style={{ backgroundImage: `url(${BannerImage})` }}></div>
      <div className='my-3 aboutBottom'>
        <input id='email' placeholder='Enter Email' type='email' onChange={handleChange} required></input>
        <button onClick={handleVerify}>Verify</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ForgotPassword;
