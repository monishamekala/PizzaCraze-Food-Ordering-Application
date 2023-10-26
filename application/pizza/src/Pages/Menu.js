// import React from 'react'
import Menuitem from './Menuitem'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menu() {
  const [menuItems, setmenu] = useState( [] )

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

  return (
    <div>
      
      <h2 style={{marginTop: "10px"}}>
        Menu List
      </h2>
      <hr></hr>

      <table style={{marginLeft: "10px"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Calories</th>
            <th>Ingredients</th>
            <th>Veg</th>
            <th>Vegan</th>
            <th>Non Veg</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(eachItem => (
            <tr key={eachItem.menu_id}>
              <td>{eachItem.name}</td>
              <td>{eachItem.category}</td>
              <td>{eachItem.description}</td>
              <td>{eachItem.price}</td>
              <td>{eachItem.calories}</td>
              <td>{eachItem.ingredients}</td>
              <td>{eachItem.is_veg}</td>
              <td>{eachItem.is_vegan}</td>
              <td>{eachItem.is_nonveg}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr></hr>
      <Menuitem></Menuitem>
      
    </div>
  )
}

export default Menu
