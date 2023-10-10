// import React from 'react'
import Menuitem from './Menuitem'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menu() {
  const [users, setusers] = useState( [] )

  useEffect( () => {
    const fetchAllusers = async () => {
      try{
        const res = await axios.get("http://localhost:8800/users");
        setusers(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllusers()
  }, [])


      
  return (
    <div>
      
      <h2 style={{marginTop: "10px"}}>
        List of Users
      </h2>
      <hr></hr>

      <table style={{marginLeft: "500px"}}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map(eachuser => (
            <tr key={eachuser.username}>
              <td>{eachuser.username}</td>
              <td>{eachuser.password}</td>
              <td>{eachuser.email}</td>
              <td>{eachuser.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr></hr>

      {/* <div>
        {users.map (eachuser => (
          <div key = {eachuser.username}>
            <h2>{eachuser.username}</h2>
            <p>{eachuser.password}</p>
            <p>{eachuser.email}</p>
            <span>{eachuser.phone}</span>
          </div>
        ))}
      </div> */}
        <Menuitem></Menuitem>
      
    </div>
  )
}

export default Menu
