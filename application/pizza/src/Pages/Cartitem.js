import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Cartitem.css';
import BannerImage from '../Assests/pizza.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cartitem(props) {

  const [item, setItemData] = useState({
    itemID: props.CIid,
    name: props.name,
    quantity: props.quan
  });

  const handleDecrement = async () => {
    if(item.quantity >1)
    {
      setItemData((prevItem) => ({
        ...prevItem,
        quantity: prevItem.quantity - 1 // Decrement the quantity
      }));
      try{
        const urlDecQuan = `/api/CartController/dec-quantity`;
  
        const res = await axios.post(process.env.REACT_APP_API_URL.concat(urlDecQuan), item, {withCredentials: true});      
      }catch(err){
        console.log(err);
      }
    }
  };

  const handleIncrement = async () => {
    if(item.quantity <= 4){
      setItemData((prevItem) => ({
        ...prevItem,
        quantity: prevItem.quantity + 1 // Increment the quantity
      }));

      try{
        const urlDecQuan = `/api/CartController/Inc-quantity`;
  
        const res = await axios.post(process.env.REACT_APP_API_URL.concat(urlDecQuan), item, {withCredentials: true});      
      }catch(err){
        console.log(err);
      }
    }
  };

  const RemoveItem = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Remove " + item.name + "?");
    if (confirm) {
      try {
        const urlRemoveItem = "/api/CartController/remove-from-cart";
        const response = await axios.post(
          process.env.REACT_APP_API_URL.concat(urlRemoveItem),
          item,
          { withCredentials: true }
        );
        if (response.data.success === "Yes") {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <ToastContainer/>
      <div class="card-CID">

        <div class="card-header">
          <div className='leftside'>
            <img src={props.image_url} className="card-img-top" alt="Pizza Image" style={{height: "50px", width: "50px", marginRight: "10px"}}/>
            <b style={{fontSize: "20px"}}>{props.name}</b>
          </div>
          <div className='rightside'>
            <p>$ {props.price}</p>
          </div>
        </div>

        <div class="card-body">
          <p>Cheese : {props.cheese}, </p>
          <p>Sauce : {props.sauce}, </p>
          <p>Meat : {props.meat}, </p>
          <p>Spice : {props.spice}</p>
        </div>

        <div className='card-footer'>
          <div className='left'>
            <button type="button" class="btn removebutton" onClick={RemoveItem}>Remove</button>
          </div>
          <div className='right-quantity'>
              <span className='minus' onClick={handleDecrement}>-</span>
              <span className='num'>{item.quantity}</span>
              <span className='plus' onClick={handleIncrement}>+</span>
          </div>
        </div>

      </div>      
    </div>
  )
}

export default Cartitem;
