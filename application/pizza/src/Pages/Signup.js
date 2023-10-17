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
    const urlHI = "/api/UserController/PostUsers";
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
            <form onSubmit={handleClick}>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
                <label for ='email'>Email</label>
                <input id='email' type = 'email' placeholder='Enter Email' onChange={handleChange} required></input>

                <label for='uname'>Username</label>
                <input id='uname' placeholder='Enter Username' onChange={handleChange} required></input>

                <label for='phone'>Phone Number</label>
                <input id='phone' placeholder='Enter Phone Number' onChange={handleChange} required></input>

                <label for ='password'>Password</label>
                <input type='Password' id='password' placeholder='Enter Password' onChange={handleChange} required></input>

                <br></br>
        
                <button type='submit'>Submit</button>
            </form>
        </div>      
    </div>
  )
}

export default Signup
