import React from "react";
import { IoMdNotifications } from "react-icons/io";

import "./NavIterms.css";

const NavIterms = ({ children }) => {
  return (
    <div className="NavIterms">
      <form action="search">
        <input type="text" placeholder="search" />
      </form>
      <button className="icon-button">
        <IoMdNotifications />
        <span className="icon-button__badge">5+</span>
      </button>
      <img
        src="https://i.pinimg.com/564x/35/ac/d0/35acd0869d84b07067eea570f8a3edc1.jpg"
        alt="profile avatar"
        className="avatar"
      />
      {children}
    </div>
  );
};

export default NavIterms;
