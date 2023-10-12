import React, { useState } from 'react';
import BannerImage from '../Assests/pizza.jpeg';
import axios from "axios";
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
const [user, setUser] = useState({
  email: "",
  uname: "",
  phone: "",
  password: ""
});

const navigate = useNavigate()

const handleChange = (e) => {
  setUser(prev => ({...prev, [e.target.id]: e.target.value}))
};

const handleClick = async e => {
  e.preventDefault()
  try{
    const urlHI = `/api/users`;
    await axios.post(process.env.REACT_APP_API_URL.concat(urlHI),user);
    // await axios.post("http://localhost:8800/users", user)
    navigate("/login")
  }
  catch(err){
    console.log(err)
  }
}

console.log(user)

  return (
    <div className='contact'>
        <div className='leftSide' style={{backgroundImage: `url(${BannerImage})`}}>

        </div>
        <div className='rightSide'>
            <form>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
                <label htmlFor='mail'>Email</label>
                <input id='email' placeholder='Enter Email' onChange={handleChange}></input>

                <label htmlFor='uname'>Username</label>
                <input id='uname' placeholder='Enter Username' onChange={handleChange}></input>

                <label htmlFor='phone'>Phone Number</label>
                <input id='phone' placeholder='Enter Phone Number' onChange={handleChange}></input>

                <label htmlFor='password'>Password</label>
                <input type='Password' id='password' placeholder='Enter Password' onChange={handleChange}></input>

                <br></br>
        
                <button type='submit' onClick={handleClick}>Submit</button>
            </form>
        </div>      
    </div>
  )
}

export default Signup
