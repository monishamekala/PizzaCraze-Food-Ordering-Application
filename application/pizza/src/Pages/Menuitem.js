import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/menuitem.css';

function Menuitem(props) {
  const [item, setItemData] = useState({
    itemID: props.itemID,
    spice: 2,
    cheese: 2,
    sauce: 2,
    meat: 2 
  });

  const [CurrentuserID, setUserID] = useState();

  const handleChange = (e) => {
    setItemData(prev => ({...prev, [e.target.id]: e.target.value}))
  };

  const checkAuth = async e => {
    e.preventDefault();
    try{
      const urlCurrentUser = "/api/UserController/CurrentUser";
      const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlCurrentUser), {withCredentials: true});
      
      if (response.data.Status === "Success"){
        
        //if the token is created (i.e., user is autherised)
        setUserID(response.data.userID);
        const user = response.data.userID;

        //add the item to the users cart
        const urlAddToCart = "/api/CartController/add-to-cart";
        const responseAddToCart = await axios.post(process.env.REACT_APP_API_URL.concat(urlAddToCart),{item, user}, {withCredentials: true});
        alert(responseAddToCart.data.message);
      } else {
        alert("Please Login");
      }
    }catch(err){
      console.error(err);
    }
  };

  return (
    <div>
      <div className="card my-3" style={{width: "20rem"}}>

        <img src={props.image_url} className="card-img-top" alt="Pzza Image" style={{height: "200px"}}/>
        <div className="card-body">

          <h5 className="card-title">{props.name}</h5>
          {/* <p className="card-text">{props.description}</p> */}

          <div className="slidecontainer">
            <label htmlFor="spice">Spice</label>
            <input type="range" min="1" max="3" className="slider" id='spice' defaultValue="2" onChange={handleChange}/>
          </div>

          <div className="slidecontainer">
            <label htmlFor="cheese">Cheese</label>
            <input type="range" min="1" max="3" className="slider" id="cheese" defaultValue="2" onChange={handleChange}/>
          </div>

          <div className="slidecontainer">
            <label htmlFor="sauce">Sauce</label>
            <input type="range" min="1" max="3" className="slider" id="sauce" defaultValue="2" onChange={handleChange}/>
          </div>

          <div className="slidecontainer">
            <label htmlFor="meat">Meat</label>
            <input type="range" min="1" max="3" className="slider" id="meat"  defaultValue="2" onChange={handleChange}/>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
          <b className="slidecontainer" id='price'>$ {props.price}</b>
          <button className="btn btn-primary custom-button" onClick = {checkAuth}>Add to Cart</button> 
          </div>
              
        </div>
      </div>
    </div>
  )
}

export default Menuitem
