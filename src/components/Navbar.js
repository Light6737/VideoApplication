import "./Navbar.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
        <h1>Video Application</h1>
      </Link>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        {/* Navigation links */}
        <li>
          <Link to="/Dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/VideoPlayer">VideoPlayer</Link>
        </li>
        <li>
          <Link to="/History">History</Link>
        </li>
      </ul>
      {/* Hamburger menu for mobile view */}
      <div className="hamburger" onClick={handleClick}>
        {/* Conditional rendering of menu icons */}
        {click ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;