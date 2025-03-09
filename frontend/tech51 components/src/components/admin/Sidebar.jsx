import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/users">Users</Link>
      <Link to="/products">Products</Link>
      <Link to="/subscriptions">Subscriptions</Link>
      <Link to="/orders">Orders</Link>
    </div>
  );
};

export default Sidebar;