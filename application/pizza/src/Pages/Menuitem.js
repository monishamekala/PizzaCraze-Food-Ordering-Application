import React from 'react';
import Pizzaimg from '../Assests/pizza.jpeg';
import '../styles/menuitem.css';

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
    <a href="#" className="btn btn-primary" style={{background:"#e65f20", border:"none"}}>Add</a>
  </div>
</div>

      
    </div>
  )
}

export default Menuitem
