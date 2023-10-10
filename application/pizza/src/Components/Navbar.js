import React from 'react';
import logo from '../Assests/pizzaLogo.png';
import {Link} from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css';
import { orange } from '@mui/material/colors';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='leftSide'>
        
        <Link to="/"><img src={logo}/></Link>
        </div>
        
        <div className='rightSide'>
            
            <Link to="/menu"> Menu</Link>
            <Link to="/signup"> Sign Up</Link>
            <Link to="/login"> Log In</Link>
            <Link to="/contact"> ContactUS</Link>
            <Link to="/about"> AboutUS</Link>
            <input type='text' placeholder='Type..' style={{marginRight: 7}}></input>
            <button style={{background: "#e65f20", border: "none", outline:"none", color: "white"}}>Search</button>
            {/* <button>
              <ReorderIcon/>
            </button> */}
        </div>
      
    </div>
  )
}

export default Navbar
