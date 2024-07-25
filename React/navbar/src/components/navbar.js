import React from "react";
import { Link } from "react-router-dom";
import "../navbar.css";
function Navbar() {
  return (
    <div className="Navbar">
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </nav>
    </div>
  );
}

export default Navbar;
