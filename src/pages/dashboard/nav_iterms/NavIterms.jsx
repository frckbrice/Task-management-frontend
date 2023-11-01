import React, { useContext, useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";

// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";
import Avatar from "react-avatar";
import "./NavIterms.css";
import PopupModal from "../../../compnents/molecules/popupModal/PopupModal";
// import OverLay from "../../../compnents/atoms/overlay/OverLay";
import { useNavigate } from "react-router-dom";
// import { TmsContext } from "../../../context/TaskBoardContext";
import { serverInterceptor } from "../../../config";
import useAuth from "../../../hooks/userAuth";
import { useStorage } from "../../../hooks/useStorage";

const NavIterms = ({
  profilePicture,
  children,
  togleProfile,
  invitationList,
}) => {
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  // const [invitationList, setInvitationList] = useState([]);
  // const { token } = useStorage("token");

  // useEffect(() => {
  //   serverInterceptor
  //     .get("/invitations/notifications", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //     .then((resp) => {
  //       if (resp && resp?.data) {
  //         console.log("Notifications", resp?.data);
  //         // setInvitationList(resp.data.invitations);
  //       }
  //     })
  //     .catch((err) => console.log("Error getting notifications", err));
  // }, []);

  const handleDecline = (id) => {
    // setInvitationList(() =>
    invitationList = invitationList?.filter(
      (invitation) => invitation.id !== id
    );
    // );
  };

  const handleNotify = () => {
    setIsNotiOpen(!isNotiOpen);
  };

  const { googleId, picture, username } = useAuth();

  return (
    <div className="NavIterms">
      {/* {isNotiOpen && <OverLay action={handleNotify} />} */}
      <form action="search">
        <input type="text" placeholder="search" />
      </form>
      <div className="tippy" followcursor={true} content="view notification">
        <button onClick={handleNotify} className="icon-button">
          <IoMdNotifications
            className={invitationList.length ? "notified" : ""}
          />
          <span className="icon-button__badge">5+</span>
        </button>
      </div>

      <div className="tippy" content="view profile">
        <Avatar
          src={picture}
          googleId={googleId}
          name={username}
          size="35"
          round={true}
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
                  username={username}
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

const Notifications = ({ invitationId, project, declineInvite, username }) => {
  const navigate = useNavigate();
  const handleInvite = () => {
    navigate(`/invitation/${invitationId}`);
  };

  return (
    <div className="notification-card">
      <div className="noti-header">
        <h3>{username}</h3>
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
