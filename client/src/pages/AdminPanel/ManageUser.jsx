// src/pages/AdminPanel/ManageSuppliers.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import BackButton from '../../components/BackButton';

const ManageUser = () => {
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('/admin/users');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (supplierId) => {
    try {
      const response = await axios.post(`/admin/users/delete/${supplierId}`);
      // Refresh supplier list
      fetchSuppliers()
    } catch (error) {
      console.error('Error verifying supplier:', error);
    }
  };

  return (
    <div className="manage-suppliers">
      <BackButton />
      <h2>Manage Suppliers</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.isVerified ? 'Verified' : 'Not Verified'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(supplier._id)}
                    className={`btn ${supplier.isVerified ? 'btn-danger' : 'btn-success'}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
