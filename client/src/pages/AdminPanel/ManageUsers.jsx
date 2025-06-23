// src/pages/AdminPanel/ManageUsers.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import BackButton from '../../components/BackButton';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/admin/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="manage-users">
      <BackButton />
      <h2>Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
