import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

function AdminLogin() {

    const [users, setusers] = useState([])

    useEffect(() => {
        const fetchAllusers = async () => {
            try {
                const urlAdmin = "/api/UserController/GetUsers"
                const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlAdmin));
                setusers(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllusers()
    }, [])

    return (
        <div className='contact'>
            <div className='leftSide' style={{ backgroundImage: `url(${BannerImage})` }}>

            </div>
            <div className='rightSide'>
                <form>
                    <h1> Admin Login</h1>
                    <label htmlFor='uname'>Username</label>
                    <input id='uname' placeholder='Enter Username'></input>
                    <label htmlFor='password'>Password</label>
                    <input type='Password' id='password' placeholder='Enter Password'></input>
                    <Link to="/AdminPanel">
                        <button>Submit</button>
                    </Link>

                </form>

            </div>
            {/* <h1>
        My Users
      </h1>

      <div>
        {users.map (eachuser => (
          <div key = {eachuser.username}>
            <h2>{eachuser.username}</h2>
            <p>{eachuser.password}</p>
            <p>{eachuser.email}</p>
            <span>{eachuser.phone}</span>
          </div>
        ))}
      </div> */}
        </div>
    )
}

export default AdminLogin
