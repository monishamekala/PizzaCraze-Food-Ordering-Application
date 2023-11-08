import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menuitem from './Menuitem';
import '../styles/MenuFilter.css';

function Menu() {
  const [menuItems, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Initial category is 'All'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const urlMenu = "/api/MenuController/GetMenu";
        const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlMenu));
        setMenu(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMenuDetails()
  }, []);

  const CheckLogin = async () => {
    try {
      const urlCurrentUser = "/api/UserController/CurrentUser";
      const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlCurrentUser), { withCredentials: true });

      if (response.data.Status === "Success") {
        const user = response.data.userID;
        const url = `/mycart/${user}`;
        navigate(url);
      }
      else {
        alert("Please log in");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const categories = [...new Set(menuItems.map(item => item.category))];

  // Filter menu items based on the selected category
  const filteredMenuItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div>
      <div className='container my-4'>
        <div>
          <button className='custom-button-filter' onClick={() => setSelectedCategory('All')}>All</button>
          {categories.map(category => (
            <button className='custom-button-filter' key={category} onClick={() => setSelectedCategory(category)}>{category}</button>
          ))}
        </div>

        {categories.map(category => (
          <div key={category}>
            <h2>{category}</h2>
            <div className='row'>
              {filteredMenuItems
                .filter(item => item.category === category)
                .map(eachItem => (
                  <div className='col-md-4' key={eachItem.menu_id}>
                    <Menuitem
                      itemID={eachItem.menu_id}
                      name={eachItem.name}
                      price={eachItem.price}
                      image_url={eachItem.image_url}
                      description={eachItem.description}
                      category={eachItem.category}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary custom-button" onClick={CheckLogin}>Go to Cart</button>
    </div>
  )
}

export default Menu
