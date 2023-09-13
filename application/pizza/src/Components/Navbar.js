import React from 'react';
import logo from '../Assests/pizzaLogo.png';
import {Link} from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='leftSide'>
        <img src={logo}/>
        </div>
        
        <div className='rightSide'>
            <Link to="/"> Home</Link>
            <Link to="/menu"> Menu</Link>
            <Link to="/contact"> ContactUS</Link>
            <Link to="/about"> AboutUS</Link>
            <button>
              <ReorderIcon/>
            </button>
        </div>
      
    </div>
  )
}

export default Navbar
