import React, { useRef, useState } from 'react';
import logo from '../Assests/pizzaLogo.png';
import {Link} from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css';
import { orange } from '@mui/material/colors';

function Navbar() {
  const searchFor = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const searchTerm = searchFor.current.value;
    setInputValue('');
  }
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

            <input id='searchItem' type='text' placeholder='Type..' style={{marginRight: 7}}ref={searchFor} value={inputValue} onChange={handleChange}></input>

            <Link to={`/searchmenu/${inputValue}`}>
              <button 
              style={{background: "#e65f20", border: "none", outline:"none", color: "white"}} onClick={handleSearch}>Search</button>
            </Link>
            
            
            {/* <button>
              <ReorderIcon/>
            </button> */}
        </div>
      
    </div>
  )
}

export default Navbar;
