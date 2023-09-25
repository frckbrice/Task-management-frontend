import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";

// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";

import "./NavIterms.css";
import PopupModal from "../../../compnents/molecules/popupModal/PopupModal";
import OverLay from "../../../compnents/atoms/overlay/OverLay";

const NavIterms = ({ profilePicture, children, togleProfile }) => {
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  const handleNotify = () => {
    setIsNotiOpen(!isNotiOpen);
  };

  return (
    <div className="NavIterms">
      {isNotiOpen && <OverLay action={handleNotify} />}
      <form action="search">
        <input type="text" placeholder="search" />
      </form>
      <div className="tippy" followCursor={true} content="view notification">
        <button onClick={handleNotify} className="icon-button">
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
      {isNotiOpen && (
        <div className="notifications">
          <PopupModal title={`Notifications`} onClick={handleNotify}>
            <div className="updateCards">
              <Notifications />
              <Notifications />
              <Notifications />
              <Notifications />
              <Notifications />
              <Notifications />
              <Notifications />
              <Notifications />
            </div>
          </PopupModal>
        </div>
      )}
    </div>
  );
};

const Notifications = () => {
  return (
    <div className="notification-card">
      <div className="noti-header">
        <h3>James</h3>
        <div className="notiBTN">
          <button className="decline">Decline</button>
          <button className="accept">Accept</button>
        </div>
      </div>
      <p>
        invites you to join <span>project Name</span>
      </p>
    </div>
  );
};

export default NavIterms;
