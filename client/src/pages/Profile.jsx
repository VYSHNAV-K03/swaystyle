import React, { useState, useEffect } from 'react';
import { base } from '../axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body text-center">
          <img
            src={base + user.profileImage || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          <h3 className="text-primary">{user.name}</h3>
          <p className="text-muted">{user.email}</p>
          <div className="mt-3 text-start">
            <p><strong>Phone:</strong> {user.phone || 'Not Provided'}</p>
            <p><strong>Address:</strong> {user.address || 'Not Provided'}</p>
            <p><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
          </div>
          <button className="btn btn-primary w-100 mt-3">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
