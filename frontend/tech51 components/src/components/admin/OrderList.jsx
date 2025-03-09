import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get('/api/orders');
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-list">
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>{order._id} - {order.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
