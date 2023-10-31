// import React from 'react'
import Menuitem from './Menuitem'
import '../styles/menuitem.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const [menuItems, setmenu] = useState([]);

  const navigate = useNavigate();

  useEffect( () => {
    const fetchMentuDetails = async () => {
      try{
        const urlMenu = "/api/MenuController/GetMenu";
        const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlMenu));
        setmenu(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchMentuDetails()
  }, [])

  const CheckLogin = async () => {
    try{
      const urlCurrentUser = "/api/UserController/CurrentUser";
      const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlCurrentUser), {withCredentials: true});

      if(response.data.Status === "Success"){
        const user = response.data.userID;
        const url = `/mycart/${user}`;
        navigate(url);
      }
      else{
        alert("Please log in");
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div>
      <div className='container my-4' >
        <div className='row'>
          {menuItems.map(eachItem => (
          <div className='col-md-4' key={eachItem.menu_id} >
            <Menuitem itemID = {eachItem.menu_id} name = {eachItem.name} price = {eachItem.price} image_url = {eachItem.image_url} description = {eachItem.description}></Menuitem>
          </div> 
          ))}
        </div>
      </div>
      <button className="btn btn-primary custom-button" onClick={CheckLogin}>Go to Cart</button>
    </div>
  )
}

export default Menu
