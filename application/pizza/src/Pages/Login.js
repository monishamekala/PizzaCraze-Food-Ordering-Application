import React from 'react';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Login.css';

function Login() {
  return (
    <div className='contact'>
        <div className='leftSide' style={{backgroundImage: `url(${BannerImage})`}}>

        </div>
        <div className='rightSide'>
            <form>
            <h1>Login</h1>
                <label htmlFor='uname'>Username</label>
                <input id='uname' placeholder='Enter Username'></input>
                <label htmlFor='password'>Password</label>
                <input type='Password' id='password' placeholder='Enter Password'></input>
                <button type='submit'>Submit</button>
                
            </form>

        </div>
      
    </div>
  )
}

export default Login
