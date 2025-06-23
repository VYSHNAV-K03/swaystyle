import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user'));

  console.log(user);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">SWAYSTYLE</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {(!user || user?.role === 'user') &&
          <>
            <Link className="navbar-brand" to="/" >Home</Link>
            <Link className="navbar-brand" to="/shop">Shop</Link>
            <Link className="navbar-brand" to="/wishlist">WishList</Link>
            <Link className="navbar-brand" to="/customize">Customizer</Link>
            <Link className="navbar-brand" to="/cart">Cart</Link>
            <Link className="navbar-brand" to="/profile">Profile</Link>
            <Link className="navbar-brand" to="/bookings">Bookings</Link>
          </>
        }
        {(user?.role === 'supplier') &&
          <>
            <li className="nav-item">
              <Link className="navbar-brand" to="/supplier">Supplier Dashboard</Link>
            </li>
          </>
        }
        {(user?.role === 'admin') &&
          <>
            <li className="nav-item">
              <Link className="navbar-brand" to="/admin">Admin Panel</Link>
            </li>
          </>
        }

        {!user ? (
          <>
            <Link className="navbar-brand" to="/login">Login</Link>
            <Link className="navbar-brand" to="/register-user">Register</Link>
          </>
        ) : (
          <li className="nav-item">
            <button
              className="btn btn-link navbar-brand"
              style={{ textDecoration: 'none' }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
