import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/menuitem.css';
import deleteIcon from '../Assests/deleteIcon.svg';
import { useParams } from 'react-router-dom';
import Cartitem from './Cartitem';




function Cart() {
    let { userID } = useParams();
    const [cartItems, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    let spiceLevel = [{1: 'Less', 2: 'Medium', 3: 'Spicy'}];
    let cheeseLevel = [{1: 'Less', 2: 'Medium', 3: 'Extra Cheese'}];
    let meatLevel = [{1: "No Meat", 2: 'Medium', 3: "Extra Meat"}];
    let sauceLevel = [{1: 'Less', 2: 'Medium', 3: 'Spicy'}];

  useEffect( () => {
    const fetchCartItems = async () => {
      try{
        const urlCartItems = `/api/CartController/get-cart-items/${userID}`;
        const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlCartItems));
        if(res.data.Message == "Your cart is empty"){
          const EmptyCartMessage = document.getElementById("EmptyCart-message");
          if (EmptyCartMessage) {
            EmptyCartMessage.textContent = res.data.Message;
          }
        }else{
          setCart(res.data);
        }
        console.log(res.data);
        
      }catch(err){
        console.log(err);
      }
    }
    fetchCartItems()
  }, [])

  useEffect( () => {
    const CalTotal = async () => {
      let totalPrice = 0;
      cartItems.forEach(eachItem=> {
        totalPrice += parseFloat(eachItem.price);
      });

      setTotal(totalPrice.toFixed(2));
    }
    CalTotal()
  }, [cartItems]);

  return (  
    <div>
    {/* {cartItems.length === 0 ? (
      <p id="EmptyCart-message">Your cart is empty</p>
    ) : (
      <div>
        <h1>Your cart</h1>
        <table style={{ marginLeft: "10px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Calories</th>
              <th>quantity</th>
              <th>cheese</th>
              <th>Sauce</th>
              <th>Meat</th>
              <th>Spice</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((eachItem) => (
              <tr key={eachItem.cart_itemID}>
                <td>{eachItem.name}</td>
                <td>{eachItem.price}</td>
                <td>{eachItem.calories}</td>
                <td>{eachItem.quantity}</td>
                <td>{cheeseLevel[0][eachItem.cheese_level]}</td>
                <td>{sauceLevel[0][eachItem.sauce_level]}</td>
                <td>{meatLevel[0][eachItem.meat_level]}</td>
                <td>{spiceLevel[0][eachItem.spice_level]}</td>
                <td>
                  <img src={deleteIcon} alt="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total: {total}</p>
        
      </div>
    )} */}
    {/* <cartitems></cartitems> */}
    <div className='container my-1' >
        <div className='row'>
          {cartItems.map(eachItem => (
          <div className='col-md-30' key={eachItem.cart_itemID} >
            <Cartitem itemID = {eachItem.cart_itemID} name = {eachItem.name} price = {eachItem.price} cheese = {cheeseLevel[0][eachItem.cheese_level]} sauce = {sauceLevel[0][eachItem.sauce_level]} meat = {meatLevel[0][eachItem.meat_level]} spice = {spiceLevel[0][eachItem.spice_level]} image_url = {eachItem.image_url}></Cartitem>
          </div> 
          ))}
        </div>
      </div>
      <button className="btn btn-primary custom-button" >CheckOut</button>
   {/* <Cartitem></Cartitem>
   <Cartitem></Cartitem>
   <Cartitem></Cartitem> */}
    </div>

  )
}

export default Cart;
