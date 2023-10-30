import React from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/AdminUsers">
              <button>Users</button>
            </Link>
          </li>
          <li>
            <Link to="/AdminMenu">
              <button>Menu</button>
            </Link>
          </li>
          <li>
            <Link to="/AdminOrders">
              <button>Orders</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminPanel;
