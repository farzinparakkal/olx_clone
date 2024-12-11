import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import './Nav.css'
import logo from '../assets/olx_logo.png'

const Nav = ({user,setFilter}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = (event) => {
    event.stopPropagation()
    setIsDropdownVisible((prevState) => !prevState)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownVisible(false)
      }
    }

    window.addEventListener("click", handleOutsideClick)
    return () => {
      window.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    alert("Logout Successfully")
    navigate("/login")
  }

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
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
          onChange={(e) => setFilter(e.target.value)}
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
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">{user}</button>
          {isDropdownVisible && (
            <div className="dropdown-content">
              <a href="/profile">Profile</a>
              <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </a>
            </div>
          )}
        </div>
        <Link to={"/sellPost"}>
        <button className="sell-button">
      + SELL
    </button>
    </Link>
      </div>
    </nav>
  );
};

export default Nav
