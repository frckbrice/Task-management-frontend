import React, { useContext, useEffect, useState } from "react";
// css import
import "./Dashboard.css";

// libery imports
// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";

// components import
// import NavBar from "../../compnents/organisms/navBar/NavBar";
import NavIterms from "./nav_iterms/NavIterms";
// import { projectData } from "../../dummyData";
import SideNav from "../../compnents/organisms/sideNav/SideNav";
import ProjectDetialsBar from "../../compnents/organisms/projectDetialsBar/ProjectDetialsBar";
import PopupModal from "../../compnents/molecules/popupModal/PopupModal";

import TaskBoard from "../../compnents/organisms/taskBoard/TaskBoard";
import DashBoardNavBar from "../../compnents/organisms/dashBoardNavBar/DashBoardNavBar";

import { TmsContext } from "../../context/TaskBoardContext";
import OverLay from "../../compnents/atoms/overlay/OverLay";
import userAuth from "../../hooks/userAuth";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const { email, username, picture } = userAuth();
  console.log("this is user data", { email, username, picture });

  // useEffect(() => {
  //   if (!user) {
  //     setUser({ email, username, picture });
  //   }

  //   localStorage.setItem("user", { email, username, picture });
  // }, [user]);

  // const user = dataValues;

  console.log("user: ", user);
  return (
    <>
      {openProfile && <OverLay action={toggleProfile} />}
      <div className="dashboard">
        <DashBoardNavBar>
          <div className="navContent">
            <NavIterms
              profilePicture={picture}
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
                <img src={picture} alt="profile avatar" />
                <div className="profileDetai">
                  <h4>{username}</h4>
                  <p>{email}</p>
                </div>
                <div className="actions">
                  <button className="logout">logout</button>
                  <button className="logout">edit</button>
                </div>
              </div>
            </PopupModal>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
