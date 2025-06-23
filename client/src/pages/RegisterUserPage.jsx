import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';

const RegisterUserPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('password', password);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      await axios.post('/auth/register-user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/login');
    } catch (err) {
      setError('Registration failed.');
    }
  };

  const handleSupplierRegister = () => {
    navigate('/register-supplier');
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
      <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body">
          <h2 className="text-center text-primary mb-4">Create Your Account</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
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
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                <div className="form-group mb-3">
                  <label htmlFor="profileImage" className="form-label">Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="profileImage"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <button
            className="btn btn-secondary w-100 mt-3"
            onClick={handleSupplierRegister}
          >
            Register as Supplier
          </button>
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

export default RegisterUserPage;
