import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
const Home = () => (
  <div className="form-wrapper">
    <h1>Welcome to the Internship Portal</h1>
    <p className="subtext">What would you like to do today?</p>
    <div className="buttons" style={{ flexDirection: 'column', gap: '15px' }}>
      <Link to="/register" className="button-link">Register as Intern/Volunteer</Link>
      <Link to="/admin-login" className="button-link btn-secondary">Admin Login</Link>
    </div>
  </div>
);

export default Home;
