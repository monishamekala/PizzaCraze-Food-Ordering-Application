import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchDataDetails = async () => {
      try {
        const urlAdminPanel = "/api/AdminController/GetMenu";
        const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlAdminPanel));
        setMenuItems(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDataDetails()
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ width: "80%", maxWidth: "800px", background: "#f0f0f0", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <table style={{ marginLeft: "10px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(eachItem => (
              <tr key={eachItem.menu_id}>
                <td>{eachItem.name}</td>
                <td>{eachItem.category}</td>
                <td>{eachItem.description}</td>
                <td>{eachItem.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminMenu;
