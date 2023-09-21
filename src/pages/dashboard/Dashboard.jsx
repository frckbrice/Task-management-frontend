import React, { useContext, useEffect, useState } from "react";
// css import
import "./Dashboard.css";

// libery imports
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

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

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const { userData } = useContext(TmsContext);
  console.log("this is user data", userData);

  useEffect(() => {
    if (!user) {
      setUser(userData);
    }

    localStorage.setItem("user", user);
  }, [user]);

  // const user = userData.dataValues;

  console.log("user: ", user);
  return (
    <>
      {openProfile && <OverLay action={toggleProfile} />}
      <div className="dashboard">
        <DashBoardNavBar>
          <div className="navContent">
            <NavIterms
              profilePicture={userData.picture}
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
                <img src={userData.picture} alt="profile avatar" />
                <div className="profileDetai">
                  <h4>{userData.username}</h4>
                  <p>{userData.email}</p>
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
