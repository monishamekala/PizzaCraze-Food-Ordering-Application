import React, { useState, useEffect } from 'react';
import axios from 'axios';
import deleteIcon from '../Assests/deleteIcon.svg';
import { Link, useParams } from 'react-router-dom';
import Cartitem from './Cartitem';

function CheckOut() {
    let { userID } = useParams();
    const [addressAdded, setAddressAdd] = useState();
    const [address, setAddress] = useState([]);

  useEffect( () => {
    const fetchCartItems = async () => {
      try{
        const urlCartItems = `/api/OrderController/get-address/${userID}`;
        const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlCartItems), {withCredentials: true});
        if(res.data.Message == "No Address Added"){
            setAddressAdd(false);
        }else{
            setAddress(res.data);
        }        
      }catch(err){
        console.log(err);
      }
    }
    fetchCartItems()
  }, [])

  return (  
    <div>
      <p>Address and Payment method</p>
      {addressAdded === false ? (
        <div>
            <p>No Adress</p>
            <input type='text'/>Address
        </div>
      ):(
        <div>Address</div>
      )}
    </div>
  )
}

export default CheckOut;
