import React, { useState } from 'react';
import '../styles/Cartitem.css';
import BannerImage from '../Assests/pizza.jpeg';

function Cartitem(props) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if(quantity >1)
    {
      setQuantity(prevCount => prevCount - 1)
    }
    ;
  }
  const handleIncrement = () => {
    setQuantity(prevCount => prevCount + 1);
  }

  return (
    <div>
        <div class="card">
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
    {/* <a href="#" class="btn btn-primary">Remove</a> */}
    <div className='left'>
    <button type="button" class="btn btn-danger">Remove</button>
    </div>
    <div className='right'>
        <span className='minus' onClick={handleDecrement}> - </span>
        <span className='num'>{quantity}</span>
        <span className='plus' onClick={handleIncrement}> + </span>
    </div>
    
    

    </div>
</div>
<hr></hr>
      
    </div>
  )
}

export default Cartitem
