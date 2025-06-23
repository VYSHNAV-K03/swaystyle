// src/pages/AdminPanel/ManageOrders.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import BackButton from '../../components/BackButton';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/admin/orders');
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="manage-orders">
      <BackButton />
      <h2>Manage Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order ID: {order._id} - Customer: {order.customerName} - Total: ${order.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageOrders;
