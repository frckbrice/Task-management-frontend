import React from "react";

// css import
import "./NavBar.css";

//assets import
import logo from "../../../assets/tasktrec_logo.png";

const NavBar = ({ children }) => {
  return (
    <nav className="navContainer">
      <div className="navbar">
        <img src={logo} alt="tasktrec logo" className="logo" />
        {children}
      </div>
    </nav>
  );
};

export default NavBar;
