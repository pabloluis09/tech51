import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get('/api/orders');
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-management">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul className="list">
        {orders.map(order => (
          <li key={order._id} className="list-item">{order._id} - {order.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersManagement;
