import React, { useEffect, useRef, useState } from 'react';
import logo from '../Assests/pizzaLogo.png';
import serachlogo from '../Assests/search.png';
import cartlogo from '../Assests/whitecart.png';
import userlogo from '../Assests/whiteuser.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css';
import { orange } from '@mui/material/colors';

function Navbar() {
  
  //to check if the user is autherised or no
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState(' ');

  const searchFor = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const searchTerm = searchFor.current.value;
    setInputValue('');
  }

  //to get the user assigned to the token
  useEffect(() => {
    const lookForAuth = async () => {
      try{
        const urlCurrentUser = "/api/UserController/CurrentUser";
        const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlCurrentUser), {withCredentials: true});
        if (response.data.Status === "Success"){
          //if the taoken is created (i.e., user is autherised then set auth to true)
          setAuth(true);
          setUsername(response.data.username);
        }
      }catch(err){
        console.error(err);
      }
    };
    lookForAuth();
  }, []);

  return (
    <div className='navbar'>
        <div className='leftSide'>
        
        <Link to="/"><img src={logo}/></Link>
        </div>
        <div id='centerside'>
        
            <Link to="/menu"> Menu</Link>
            {auth ? <Link to="/login">{username}</Link> : <Link to="/login"> Log In</Link> }
            <Link to="/contact"> Contact</Link>
            <Link to="/about"> About</Link>
        </div>
        
        <div className='rightSide'>
            <div class="search">
                    <input type="text" placeholder="Type.." ref={searchFor} value={inputValue} onChange={handleChange}/>
                    <Link to={`/searchmenu/${inputValue}`}>
                    <button onClick={handleSearch}><img src={serachlogo}/></button>
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
