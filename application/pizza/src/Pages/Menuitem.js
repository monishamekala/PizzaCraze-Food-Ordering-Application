import React from 'react';
import Pizzaimg from '../Assests/pizza.jpeg';

function Menuitem() {
  return (
    <div>
        <h2 style={{marginBottom: "30px", marginTop: "20px"}}>Menu List</h2>
        <div className="card" style={{width: "18rem"}}>
  <img src={Pizzaimg} className="card-img-top" alt="Pzza Image"/>
  <div className="card-body">
    <h5 className="card-title">Margerita</h5>
    <p className="card-text">Thin crust pizza with lots of cheese, along with the toppings of olives and jalepeno</p>
    <div className="slidecontainer">
        <label htmlFor="spice" style={{marginRight: "15px"}}>Spice</label>
  <input type="range" min="1" max="4" value="2" className="slider" id="spice"/>
</div>
<div className="slidecontainer">
<label htmlFor="cheese" style={{marginRight: "10px"}}>Cheese</label>
  <input type="range" min="1" max="4" value="4" className="slider" id="cheese" style={{background: "black", color: "black"}}/>
</div>
    <a href="#" className="btn btn-primary" style={{background:"#e65f20", border:"none"}}>Add</a>
  </div>
</div>

      
    </div>
  )
}

export default Menuitem
