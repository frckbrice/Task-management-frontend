import React, { useContext, useEffect, useState } from "react";

import "./Dashboard.css";

import avatar from "../../assets/avatar.jpg";

import Avatar from "react-avatar";
import NavIterms from "./nav_iterms/NavIterms";
import SideNav from "../../compnents/organisms/sideNav/SideNav";
import ProjectDetialsBar from "../../compnents/organisms/projectDetialsBar/ProjectDetialsBar";
import PopupModal from "../../compnents/molecules/popupModal/PopupModal";

import TaskBoard from "../../compnents/organisms/taskBoard/TaskBoard";
import DashBoardNavBar from "../../compnents/organisms/dashBoardNavBar/DashBoardNavBar";

import { TmsContext } from "../../context/TaskBoardContext";
import OverLay from "../../compnents/atoms/overlay/OverLay";
import useAuth from "../../hooks/userAuth";
import { conf, server, serverInterceptor } from "../../config";

const Dashboard = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);
  const { profilePict, setProfilePict } = useContext(TmsContext);

  const { username, picture, email, googleId } = useAuth();

  console.log("profilPict", `"${profilePict}"`);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    serverInterceptor
      .get("/invitation/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((resp) => {
        if (resp && resp?.data) {
          console.log("Notifications", resp?.data);
          setNotificationsList(resp.data);
        }
      })
      .catch((err) => console.log("Error getting notifications", err));
  }, [token]);

  if (picture) setProfilePict(picture);

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const logout = async () => {
    const resp = await server.post("/auth/logout", {
      headers: conf.headers,
    });

    if (resp && resp?.data?.accessToken) {
      localStorage.setItem(resp?.data?.accessToken);
      localStorage.setItem(resp?.data?.refreshToken);
    }
  };

  const editProfile = async () => {
    const data = {};
    await server.patch("/members", data, {
      headers: conf.headers,
    });
  };

  // console.log("user: ", user);
  return (
    <div className="dashboard">
      {openProfile && <OverLay action={toggleProfile} />}

      <DashBoardNavBar>
        <div className="navContent">
          <NavIterms
            profilePicture={`"${profilePict}"` || avatar}
            togleProfile={toggleProfile}
            invitationList={notificationsList}
          ></NavIterms>
        </div>
      </DashBoardNavBar>
      {/* <NavBar className="dashNav"></NavBar> */}
      <div className="workSpace">
        <div className="sideNav-section">
          <SideNav />
        </div>
        <div className="main-section">
          <ProjectDetialsBar />
          <TaskBoard />
        </div>
      </div>
      {openProfile && (
        <div className="userProfile">
          <PopupModal onClick={toggleProfile}>
            <div className="profile">
              {/* <img src={picture} alt="profile avatar" /> */}
              <Avatar
                src={picture}
                googleId={googleId}
                size="50"
                round={true}
              />
              <div className="profileDetai">
                <span>{username}</span>
                <span>{email}</span>
              </div>
              <div className="actions">
                <button className="edit" onClick={logout}>
                  logout
                </button>
                <button className="edit" onClick={editProfile}>
                  edit
                </button>
              </div>
            </div>
          </PopupModal>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
