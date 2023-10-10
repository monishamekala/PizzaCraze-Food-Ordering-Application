import React from 'react';
import Pizzaimg from '../Assests/pizza.jpeg';

function Menuitem() {
  return (
    <div>
        <h2 style={{marginBottom: "30px", marginTop: "20px"}}>Menu List</h2>
        <div class="card" style={{width: "18rem"}}>
  <img src={Pizzaimg} class="card-img-top" alt="Pzza Image"/>
  <div class="card-body">
    <h5 class="card-title">Margerita</h5>
    <p class="card-text">Thin crust pizza with lots of cheese, along with the toppings of olives and jalepeno</p>
    <div class="slidecontainer">
        <label for="spice" style={{marginRight: "15px"}}>Spice</label>
  <input type="range" min="1" max="4" value="2" class="slider" id="spice"/>
</div>
<div class="slidecontainer">
<label for="cheese" style={{marginRight: "10px"}}>Cheese</label>
  <input type="range" min="1" max="4" value="4" class="slider" id="cheese" style={{background: "black", color: "black"}}/>
</div>
    <a href="#" class="btn btn-primary" style={{background:"#e65f20", border:"none"}}>Add</a>
  </div>
</div>

      
    </div>
  )
}

export default Menuitem
