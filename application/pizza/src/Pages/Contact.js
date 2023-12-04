import React from 'react';
import {Link} from 'react-router-dom';
import BannerImage from '../Assests/pizza.jpeg';

function Contact() {
  return (
    <div className= "my-3 about">
        <div className='aboutTop' style={{backgroundImage: `url(${BannerImage})`}}></div>
        <div className='my-3 aboutBottom'>
            <h1>Contact US</h1>
            <div className="my-5 d-flex justify-content-between">
              <Link to={'https://instagram.com'}>
            <button type="button" className="btn btn-dark">Instagram</button></Link>
            <Link to={'mailto:pizzacrazesf@gmail.com'}>
            <button type="button" className="btn btn-dark">Mail</button></Link>
            <Link to={'https://twitter.com'}>
            <button type="button" className="btn btn-dark">Twitter</button></Link>
            </div>
            <div className="my-3 d-flex justify-content-around">
              FAQ<br></br>
              What types of pizza do you offer?<br></br>
              Can I customize my own pizza with specific toppings?<br></br>
              Do you offer gluten-free crust options?<br></br>
              What sizes of pizzas are available?<br></br>
              Is there a menu for sides and beverages?<br></br>
              Do you have vegetarian or vegan pizza options?<br></br>
              What are your delivery areas and charges?<br></br>
              How can I place an order online?<br></br>
              What are your business hours?<br></br>
              Are there any current promotions or discounts?<br></br>
              Do you offer catering services for events?<br></br>
              What payment methods do you accept?<br></br>
              How do I track my delivery order?<br></br>
              Can I order in advance or schedule a future delivery?<br></br>
              What is your policy on returns or refunds?<br></br>
              Are nutritional information and allergen details available for your menu items?<br></br>
              Do you offer contactless delivery or pickup options?<br></br>
              Can I join a loyalty or rewards program?<br></br>
              Are there any special deals for large group orders?<br></br>
              How do I contact customer support for any issues with my order?<br></br>
            </div>
            
        </div>
      
    </div>
  )
}

export default Contact
