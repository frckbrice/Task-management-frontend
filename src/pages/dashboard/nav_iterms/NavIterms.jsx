import React from "react";
import { IoMdNotifications } from "react-icons/io";

import "./NavIterms.css";

const NavIterms = ({ profilePicture, children }) => {
  return (
    <div className="NavIterms">
      <form action="search">
        <input type="text" placeholder="search" />
      </form>
      <button className="icon-button">
        <IoMdNotifications />
        <span className="icon-button__badge">5+</span>
      </button>
      <img src={profilePicture} alt="profile avatar" className="avatar" />
      {children}
    </div>
  );
};

export default NavIterms;
