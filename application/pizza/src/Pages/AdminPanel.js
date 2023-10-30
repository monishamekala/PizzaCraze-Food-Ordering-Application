import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [Users, setusers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenu] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/AdminController/GetOrders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/AdminController/GetUsers');
      setusers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await axios.get('/api/AdminController/GetMenu');
      setMenu(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={fetchOrders}>Show Orders</button>
      <button onClick={fetchUsers}>Show Users</button>
      <button onClick={fetchMenu}>Show Menu</button>

      <div>
        <h2>Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Users</h2>
        <ul>
          {Users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Menu</h2>
        <ul>
          {menuItems.map((menuItem) => (
            <li key={menuItem.menu_id}>{menuItem.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
