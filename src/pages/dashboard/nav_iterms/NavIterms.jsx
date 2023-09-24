import React from "react";
import { IoMdNotifications } from "react-icons/io";

// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";

import "./NavIterms.css";

const NavIterms = ({ profilePicture, children, togleProfile }) => {
  return (
    <div className="NavIterms">
      <form action="search">
        <input type="text" placeholder="search" />
      </form>
      <div className="tippy" followCursor={true} content="view notification">
        <button className="icon-button">
          <IoMdNotifications />
          <span className="icon-button__badge">5+</span>
        </button>
      </div>

      <div className="tippy" content="view profile">
        <img
          src={profilePicture}
          alt="profile avatar"
          className="profile-avatar"
          onClick={togleProfile}
        />
      </div>

      {children}
    </div>
  );
};

export default NavIterms;
