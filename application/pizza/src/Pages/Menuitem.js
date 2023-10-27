import React from 'react';
import Pizzaimg from '../Assests/pizza.jpeg';
import '../styles/menuitem.css';

function Menuitem(props) {
  return (
    <div>
        {/* <h2 style={{marginBottom: "30px", marginTop: "20px"}}>Menu List</h2> */}
        <div className="card my-3" style={{width: "18rem"}}>
  <img src={props.image_url} className="card-img-top" alt="Pzza Image" style={{height: "200px"}}/>
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    {/* <p className="card-text">{props.description}</p> */}
    <div className="slidecontainer">
        <label htmlFor="spice" >Spice</label>
  <input type="range" min="0" max="3" className="slider" id="spice" />
</div>
<div className="slidecontainer">
<label htmlFor="cheese" >Cheese</label>
  <input type="range" min="0" max="3" className="slider" id="cheese" />
</div>
<div className="slidecontainer">
<label htmlFor="sauce" >Sauce</label>
  <input type="range" min="0" max="3" className="slider" id="sauce" />
</div>
<div className="slidecontainer">
<label htmlFor="meat" >Meat</label>
  <input type="range" min="0" max="3" className="slider" id="meat"  />
</div>
<b id='price'>{props.price} $</b>
    <a href="#" className="btn btn-primary" style={{background:"#e65f20", border:"none",marginTop:"5px", display:"block"}}>Add to Cart</a>
  </div>
</div>

      
    </div>
  )
}

export default Menuitem
