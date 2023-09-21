import React from "react";
import { IoMdNotifications } from "react-icons/io";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import "./NavIterms.css";

const NavIterms = ({ profilePicture, children, togleProfile }) => {
  return (
    <div className="NavIterms">
      <form action="search">
        <input type="text" placeholder="search" />
      </form>
      <Tippy className="tippy" followCursor={true} content="view notification">
        <button className="icon-button">
          <IoMdNotifications />
          <span className="icon-button__badge">5+</span>
        </button>
      </Tippy>

      <Tippy className="tippy" content="view profile">
        <img
          src={profilePicture}
          alt="profile avatar"
          className="avatar"
          onClick={togleProfile}
        />
      </Tippy>

      {children}
    </div>
  );
};

export default NavIterms;
