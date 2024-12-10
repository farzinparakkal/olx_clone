import React from 'react'
import './Nav.css'

const Nav = () => {
  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="nav-left">
        <img src="logo.png" alt="Logo" className="logo" />
        <select className="location-dropdown">
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>
      </div>

      {/* Center Section */}
      <div className="nav-center">
        <input
          type="text"
          className="search-input"
          placeholder="Find Cars, Mobile Phones and more..."
        />
        <button className="search-button">
          <i className="search-icon">&#128269;</i>
        </button>
      </div>

      {/* Right Section */}
      <div className="nav-right">
        <button className="lang-button">
          ENGLISH <span>&#9662;</span>
        </button>
        <i className="icon chat-icon">&#128172;</i>
        <i className="icon bell-icon">&#128276;</i>
        <div className="profile-icon"></div>
        <button className="sell-button">
      + SELL
    </button>
      </div>
    </nav>
  );
};

export default Nav
