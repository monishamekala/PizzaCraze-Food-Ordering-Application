import React from 'react';
import {Link} from 'react-router-dom';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Home.css';

function Home() {
  return (
    <div className='home' style={{backgroundImage: `url(${BannerImage})`}}>
      <div className='headerContainer'>
        <h1>Pizza Craze</h1>
        <br/>
        <p>We serve the most cheesiest pizzas</p>

        <Link to={'/menu'}>
        <button>Order NOW</button></Link>

        

      </div>
    </div>
  )
}

export default Home
