import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";



const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="logo">📝 Notes App</div>
        <div className="nav-links">
          <NavLink to="/" exact className="nav-link" activeClassName="active">Notes</NavLink>
          <NavLink to="/create" className="nav-link" activeClassName="active">Create Note</NavLink>
        </div>
      </nav>
    );
  };
export default Navbar;
