import React, { useRef, useState } from 'react';
import logo from '../Assests/pizzaLogo.png';
import serachlogo from '../Assests/search.png';
import cartlogo from '../Assests/whitecart.png';
import userlogo from '../Assests/whiteuser.png';
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
        <div id='centerside'>
        
            <Link to="/menu"> Menu</Link>
            <Link to="/login"> Log In</Link>
            <Link to="/contact"> Contact</Link>
            <Link to="/about"> About</Link>
        </div>
        
        <div className='rightSide'>
            <div class="search">
                    <input type="text" placeholder="Type.." />
                    <Link to={`/searchmenu/${inputValue}`}>
                    <button><img src={serachlogo}/></button>
                    </Link>
                    
                </div>
                <Link to="/contact"><img src={cartlogo}/></Link>
            <Link to="/about"><img src={userlogo}/></Link>
                {/* <a href="#"><img src="/Navbar/cart.png" alt="Logo" width="20px"/></a>
                <a href="#"><img src="/Navbar/male-user.png" alt="Logo" width="20px"/></a> */}


            </div>
            

            {/* <input id='searchItem' type='text' placeholder='Type..' style={{marginRight: 7}}ref={searchFor} value={inputValue} onChange={handleChange}></input>

            <Link to={`/searchmenu/${inputValue}`}>
              <button 
              style={{background: "#e65f20", border: "none", outline:"none", color: "white"}} onClick={handleSearch}>Search</button>
            </Link> */}
            
            
            {/* <button>
              <ReorderIcon/>
            </button> */}
        {/* </div> */}
      
    </div>
  )
}

export default Navbar;
