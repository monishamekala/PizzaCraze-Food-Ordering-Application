import React, { useEffect, useRef, useState } from 'react';
import logo from '../Assests/pizzaLogo.png';
import serachlogo from '../Assests/search.png';
// import cartlogo from '../Assests/whitecart.png';
// import userlogo from '../Assests/whiteuser.png';
import cartlogo from '../Assests/cart-fill.svg';
import userlogo from '../Assests/person-circle.svg';
import loginlogo from '../Assests/add-profile.svg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import handleLogout from '../Pages/ProfilePage';
import '../styles/Navbar.css';

function Navbar() {
  
  //to check if the user is autherised or no
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState(' ');
  const [userID, setUserID] = useState(null);

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
          //if the token is created (i.e., user is autherised then set auth to true)
          setAuth(true);
          setUsername(response.data.username);
          setUserID(response.data.userID);
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
            {/* {auth ? <Link to="/logout">{username}</Link> : <Link to="/login"> Log In</Link> } */}

            {/* {auth && (<Link to = '/' onClick={handleLogout}>Logout</Link>)} */}

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
            {auth ? <Link to={`/profile/${userID}`}><img src={userlogo} alt={username}/></Link> : <Link to="/login"> <img src={loginlogo} alt='profile'/></Link> }
        </div>
    </div>
  )
}

export default Navbar;
