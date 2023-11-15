import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function CheckOut() {

  let { userID } = useParams();
  const [addressAdded, setAddressAdd] = useState();
  const [address, setAddress] = useState([]);
  const [Postaddress, setPostAddress] = useState({
    line1: "",
    line2: "",
    apt: "",
    zipcode: ""
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [AddressForm, isAddressForm] = useState(false);
  const [AddAddressButton, SetAddAddressButton] = useState(true);

  // To disable Place order button if address, payment method not selected and card details not added(if card) 
  const [selectedPayment, setForPayment] = useState(false);
  const [selectedAddress, setForAddress] = useState(false);
  const [addedCard, setaddedCard] = useState(false);

  const [orderdetails, setorderdetails] = useState({
    address:"",
    paymentmethod: ""
  });

  const navigte = useNavigate();

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

  const handleInputChange = (e) => {
    setPostAddress(prev => ({...prev, [e.target.id]: e.target.value}));
  };

  const addAddress = async () => {
    try{
      const urladdress = `/api/OrderController/add-address`;
      const res = await axios.post(process.env.REACT_APP_API_URL.concat(urladdress), {userID, Postaddress}, {withCredentials: true});
      if(res.data.Message === "Added successfully"){
          window.location.reload();
      }else{
        alert("Try again");
      }        
    }catch(err){
      console.log(err);
    }
  };

  const ShowAddressForm = () => {
    isAddressForm(true);
    SetAddAddressButton(false);
  };

  const handleAddressSelection = (event) => {
    setorderdetails({
      ...orderdetails,
      address: event.target.value
    });
    // Address is selected
    setForAddress(true);
  };

  const handlePaymentOption = (event) => {
    const selectedValue = event.target.value;

    setSelectedOption(selectedValue);

    setorderdetails((prevOrderDetails) => {
      return {
        ...prevOrderDetails,
        paymentmethod: selectedValue,
      };
    });

    // Payment is selected
    setForPayment(true);

    //Enable Place order button if payment method is cash
    setaddedCard(selectedValue === 'cash');
  };

  const CardDetailsAdded = () => {
    setaddedCard(true);
    alert("Payment successful");
  };

  const PlaceOrderNow = async () => {
    console.log(orderdetails);
    try{
      const urladdress = `/api/OrderController/confirm-order`;
      const res = await axios.post(process.env.REACT_APP_API_URL.concat(urladdress), {userID, orderdetails}, {withCredentials: true});
      if(res.data.Message === "Added successfully"){
          // alert("Added");
          navigte("/orderconfirm");
      }else{
        alert("Try again");
      }        
    }catch(err){
      console.log(err);
    }
  }

  return (  
    <div>
      {AddAddressButton && (
        <button type='button' className='btn btn-primary' onClick={ShowAddressForm}>Add Address</button>
      )}
      {AddressForm && (
        <div>
        <form onSubmit={addAddress}>
          <div>
            <label htmlFor='addressinput'>Address Line 1</label>
            <input type='text'id = 'line1' className='form-control' onChange={handleInputChange} required/>
          </div>
          <div>
            <label htmlFor='addressinput'>Address Line 2</label>
            <input type='text'id = 'line2' className='form-control' onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor='apt'>Apt. building landmark</label>
            <input type='text'id = 'apt' className='form-control' onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor='addressinput'>Zipcode</label>
            <input type='text'id = 'zipcode' className='form-control' pattern="[0-9]{5}" onChange={handleInputChange} required/>
          </div>
          <button type='submit' className='btn btn-primary'>submit</button>
        </form>  
      </div>
      )}

      {address.length === 0 ? (
        <div>
          <h1>Please add adress</h1>
        </div>
      ):(
        <div>
          <h2>Your existing address</h2>
          {address.map((eachItem, index) => (
            <div className='col-md-30' key={eachItem.addressID} >
              <label htmlFor='address'></label>
              <input className = 'form-check-input mt-0' type="radio" value={eachItem.addressID} name='addresses' id={`address-${index}`} onChange={handleAddressSelection}/> {eachItem.line1 + eachItem.line2 + eachItem.apt + eachItem.zipcode}
            </div> 
          ))}
        </div>
      )}
      <div>
        <h1>Choose payment method</h1>
        <input type="radio" id="cash" name = "paymenthmethod" value="cash" checked = {selectedOption === 'cash'} onChange={handlePaymentOption}/>
        <label htmlFor="cash">Cash</label>

        <input type="radio" id="card" name = "paymenthmethod" value="card" checked = {selectedOption === 'card'} onChange={handlePaymentOption}/>
        <label htmlFor="card">Card</label>

        {selectedOption === 'card' && (
        <div>
          <h2>Enter Card Details</h2>
          <form className="form-group">
            <input type='text' id = 'cardNumber' className="form-control" required/>Card Number
            <input type='text' id = 'CardHolderName' className="form-control" required/>Card Holder Name
            <input type='text' id = 'CVV' className="form-control" required/>CVV
            <input type='date' id = 'exp' className="form-control" required/>Expiry Date
            <button type = 'button' className="btn btn-primary" onClick={CardDetailsAdded}>Add</button>
          </form>
        </div>
      )}
      </div>
      <button type = 'submit' className='btn btn-primary' onClick={PlaceOrderNow} disabled = {!selectedAddress || !selectedPayment || !addedCard}>Place order</button>
    </div>
  )
}

export default CheckOut;
