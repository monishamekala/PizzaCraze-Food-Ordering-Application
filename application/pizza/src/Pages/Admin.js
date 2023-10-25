import React from 'react';
import {Link} from 'react-router-dom';
import BannerImage from '../Assests/pizza.jpeg';

function Admin() {
  return (
    <div className= "my-3 about">
        <div className='aboutTop' style={{backgroundImage: `url(${BannerImage})`}}></div>
        <div className='my-3 aboutBottom'>
            <p>Please remove navbar for admin panel</p>
            <h1>Admin login</h1>

            <div>
            <form>
                <label htmlFor='email'>Email</label>
                <input id='email' placeholder='Enter Email'></input>
                <label htmlFor='password'>Password</label>
                <input type='Password' id='password' placeholder='Enter Password'></input>
                <button type='submit'>Submit</button>
            </form>
            </div>

            <h3>On admin Log-in below should display</h3>

            <div className="my-5 d-flex justify-content-between">
                <Link to={'/about/teamlead'}><button type="button" className="btn btn-dark">Users</button></Link>
                <Link to={'/about/frontendlead'}>
                <button type="button" className="btn btn-dark">Orders</button></Link>
                <Link to={'/about/backendlead'}>
                <button type="button" className="btn btn-dark">Menu</button></Link>
            </div>
            
        </div>
      
    </div>
  )
}

export default Admin
