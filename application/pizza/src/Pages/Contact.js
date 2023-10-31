import React from 'react';
import {Link} from 'react-router-dom';
import BannerImage from '../Assests/pizza.jpeg';

function Contact() {
  return (
    <div className= "my-3 about">
        <div className='aboutTop' style={{backgroundImage: `url(${BannerImage})`}}></div>
        <div className='my-3 aboutBottom'>
            <h1>Contact US</h1>
            <p> Hello everyone, we are a group of 5 people and we are building a pizza ordering system. The users of this website will be able to look at the menu which has different pizzas they can order. The users can place an order and also contact us. The page you are veiwing now is the about us page which has all of our details. Plase click on different roles to know more about that person.

            </p>
            <div className="my-5 d-flex justify-content-between">
            <Link to={'/about/teamlead'}><button type="button" className="btn btn-dark">Team Lead</button></Link>
        <Link to={'/about/frontendlead'}>
        <button type="button" className="btn btn-dark">Frontend Lead</button></Link>
        <Link to={'/about/backendlead'}>
        <button type="button" className="btn btn-dark">Backend Lead</button></Link>
        

            </div>
            <br></br>
            <div className="my-3 d-flex justify-content-around">
            <Link to={'/about/github'}>
        <button type="button" className="btn btn-dark">Github Master</button></Link>
        <Link to={'/about/scrummaster'}>
        <button type="button" className="btn btn-dark">Scrum Master</button></Link>
            </div>
            
        </div>
      
    </div>
  )
}

export default Contact
