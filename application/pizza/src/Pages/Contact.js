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
            <Link to={'https://instagram.com'}><button type="button" className="btn btn-dark">Instagram</button></Link>
        <Link to={'mailto:pizzacrazesf@gmail.com'}>
        <button type="button" className="btn btn-dark">Mail</button></Link>
        <Link to={'https://twitter.com'}>
        <button type="button" className="btn btn-dark">Twitter</button></Link>
        

            </div>
            <div className="my-3 d-flex justify-content-around">
              <h1>FAQ</h1>
              What types of pizza do you offer?
              Can I customize my own pizza with specific toppings?
              Do you offer gluten-free crust options?What sizes of pizzas are available?
              Is there a menu for sides and beverages?
              Do you have vegetarian or vegan pizza options?
              What are your delivery areas and charges?
              How can I place an order online?
              What are your business hours?
              Are there any current promotions or discounts?
              Do you offer catering services for events?
              What payment methods do you accept?
              How do I track my delivery order?
              Can I order in advance or schedule a future delivery?
              What is your policy on returns or refunds?
              Are nutritional information and allergen details available for your menu items?
              Do you offer contactless delivery or pickup options?
              Can I join a loyalty or rewards program?
              Are there any special deals for large group orders?
              How do I contact customer support for any issues with my order?
            </div>
            
        </div>
      
    </div>
  )
}

export default Contact
