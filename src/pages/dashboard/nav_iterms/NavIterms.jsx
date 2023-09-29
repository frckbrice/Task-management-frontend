import React, { useContext, useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";

// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";

import "./NavIterms.css";
import PopupModal from "../../../compnents/molecules/popupModal/PopupModal";
import OverLay from "../../../compnents/atoms/overlay/OverLay";
import { useNavigate } from "react-router-dom";
import { TmsContext } from "../../../context/TaskBoardContext";
import { serverInterceptor } from "../../../config";

const NavIterms = ({ profilePicture, children, togleProfile }) => {
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  const [invitationList, setInvitationList] = useState([]);

  useEffect(() => {
    serverInterceptor
      .get("/invitations/notifications", {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((resp) => {
        if (resp && resp?.data && resp.data.invitations.length) {
          setInvitationList(resp.data.invitations);
        }
      })
      .catch((err) => console.log("Error getting notifications", err));
  }, []);

  const handleDecline = (id) => {
    setInvitationList(
      invitationList?.filter((invitation) => invitation.id === id)
    );
  };

  const handleNotify = () => {
    setIsNotiOpen(!isNotiOpen);
  };

  return (
    <div className="NavIterms">
      {/* {isNotiOpen && <OverLay action={handleNotify} />} */}
      <form action="search">
        <input type="text" placeholder="search" />
      </form>
      <div className="tippy" followcursor={true} content="view notification">
        <button onClick={handleNotify} className="icon-button">
          <IoMdNotifications />
          <span className="icon-button__badge">5+</span>
        </button>
      </div>

      <div className="tippy" content="view profile">
        <img
          src={profilePicture}
          alt=""
          className="profile-avatar"
          onClick={togleProfile}
        />
      </div>
      {children}
      {isNotiOpen && (
        <div className="notifications">
          <PopupModal title={`Notifications`} onClick={handleNotify}>
            {invitationList?.map((invitation) => (
              <div className="updateCards" key={invitation.id}>
                <Notifications
                  invitationId={invitation.id}
                  project={invitation.project}
                  declineInvite={() => handleDecline(invitation.id)}
                />
              </div>
            ))}
          </PopupModal>
        </div>
      )}
    </div>
  );
};

const Notifications = ({ invitationId, project, declineInvite }) => {
  const navigate = useNavigate();
  const handleInvite = () => {
    navigate(`/invitation/${invitationId}`);
  };

  return (
    <div className="notification-card">
      <div className="noti-header">
        <h3>James</h3>
        <div className="notiBTN">
          <button className="decline" onClick={declineInvite}>
            Decline
          </button>
          <button className="accept" onClick={handleInvite}>
            Accept
          </button>
        </div>
      </div>
      <p>
        invites you to join <span>{project.name}</span>
      </p>
    </div>
  );
};

export default NavIterms;
