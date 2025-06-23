import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';

const RegisterSupplierPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register-supplier', { name: companyName, email, password });
      // On successful registration, navigate to the login page
      window.location.href = '/login';
    } catch (err) {
      setError('Registration failed.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1664475347754-f633cb166d13?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="text-center text-primary mb-4">Register as Supplier</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <p className="text-center mt-3">
            Already have an account?{' '}
            <Link to="/login" className="text-primary text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSupplierPage;
