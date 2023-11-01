import React, { useContext, useEffect, useState } from "react";
// css import
import "./Dashboard.css";

// libery imports
// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";
import avatar from "../../assets/avatar.jpg";

// components import
import Avatar from "react-avatar";
import NavIterms from "./nav_iterms/NavIterms";
// import { projectData } from "../../dummyData";
import SideNav from "../../compnents/organisms/sideNav/SideNav";
import ProjectDetialsBar from "../../compnents/organisms/projectDetialsBar/ProjectDetialsBar";
import PopupModal from "../../compnents/molecules/popupModal/PopupModal";

import TaskBoard from "../../compnents/organisms/taskBoard/TaskBoard";
import DashBoardNavBar from "../../compnents/organisms/dashBoardNavBar/DashBoardNavBar";

import { TmsContext } from "../../context/TaskBoardContext";
import OverLay from "../../compnents/atoms/overlay/OverLay";
import useAuth from "../../hooks/userAuth";
import { conf, server } from "../../config";
import { useStorage } from "../../hooks/useStorage";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  const { profilePict, setProfilePict } = useContext(TmsContext);
  const navigate = useNavigate();

  const { token, setStorToken } = useStorage("token");
  if (!token) navigate("/login");
  const { username, picture, email, googleId } = useAuth();

  // console.log("picture", picture);
  console.log("profilPict", `"${profilePict}"`);

  if (picture) setProfilePict(picture);

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const { setlsData } = useLocalStorage("refreshToken", " ");

  const logout = async () => {
    const resp = await server.post("/auth/logout", {
      headers: conf.headers,
    });

    if (resp && resp?.data?.accessToken) {
      setStorToken(resp?.data?.accessToken);
      setlsData(resp?.data?.refreshToken);
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
                <button className="edit" onClick={editProfile}>
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
