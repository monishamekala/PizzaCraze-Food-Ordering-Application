import React from 'react';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Login.css';

function Signup() {
  return (
    <div className='contact'>
        <div className='leftSide' style={{backgroundImage: `url(${BannerImage})`}}>

        </div>
        <div className='rightSide'>
            <form>
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
                <label htmlFor='mail'>Email</label>
                <input id='mail' placeholder='Enter Email'></input>
                <label htmlFor='uname'>Username</label>
                <input id='uname' placeholder='Enter Username'></input>
                <label htmlFor='password'>Password</label>
                <input type='Password' id='password' placeholder='Enter Password'></input>
                <br></br>
        
                <button type='submit'>Submit</button>
            </form>

        </div>
      
    </div>
  )
}

export default Signup
