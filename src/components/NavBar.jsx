import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Your custom CSS

const NavBar = () => {
  return (
    <nav className="navbar custom-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <ul className="navbar-nav flex-row gap-4">
          {/* ✅ Removed 'Events' link here */}
          <li className="nav-item">
            
          </li>
        </ul>

        <div>
          <Link className="nav-link text-white" to="/admin">Admin Panel</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
