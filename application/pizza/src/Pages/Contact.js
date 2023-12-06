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
            <div className="FAQ">
              <p style={{fontSize: 40}}>FAQ</p><br></br>
              <div className='card'>
              <p style={{fontSize: 30}}> What types of pizza do you offer?</p><br></br>

              <p>We offer a diverse range of pizza options, including classic favorites like Margherita, Pepperoni, and Hawaiian, as well as unique specialty pizzas such as BBQ Chicken, Veggie Delight, and Meat Lovers. Our menu is designed to cater to a variety of tastes and preferences.</p>
              </div>
              <div className='card'>
              <p style={{fontSize: 30}}> Can I customize my own pizza with specific toppings?</p><br></br>

              <p>Absolutely! You have the flexibility to create your own custom pizza with a variety of toppings. Choose from a selection of fresh vegetables, meats, cheeses, and more to tailor your pizza to your liking. Our goal is to provide a personalized and enjoyable dining experience.</p>
              </div>
              <div className='card'>
              <p style={{fontSize: 30}}> Do you offer gluten-free crust options?</p><br></br>

              <p>Yes, we understand the importance of catering to different dietary needs. We offer gluten-free crust options for those with gluten sensitivities or preferences. Enjoy your favorite pizza with a crust that suits your dietary requirements.</p>
              </div>
              <div className='card'>
              <p style={{fontSize: 30}}> What sizes of pizzas are available?</p><br></br>

              <p><b>Answer: </b>Our pizzas come in various sizes to accommodate different appetites. You can choose from personal-sized pizzas for an individual meal, medium-sized pizzas for sharing with a friend, or large-sized pizzas for larger gatherings. Our size options ensure there's something for everyone.</p>
              </div>
              <div className='card'>
              <p style={{fontSize: 30}}> Is there a menu for sides and beverages?</p><br></br>

              <p>Yes, our menu extends beyond pizzas to include a variety of delicious sides and refreshing beverages. Whether you're craving appetizers like garlic knots or looking for the perfect drink to complement your meal, our menu has a diverse selection to enhance your dining experience.</p>
              </div>
              
              
             
              
              
              
            </div>
            
        </div>
      
    </div>
  )
}

export default Contact
