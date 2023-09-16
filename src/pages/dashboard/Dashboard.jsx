import React, { useContext, useEffect, useState } from "react";
// css import
import "./Dashboard.css";

// components import
// import NavBar from "../../compnents/organisms/navBar/NavBar";
import NavIterms from "./nav_iterms/NavIterms";
// import { projectData } from "../../dummyData";
import SideNav from "../../compnents/organisms/sideNav/SideNav";
import ProjectDetialsBar from "../../compnents/organisms/projectDetialsBar/ProjectDetialsBar";

import TaskBoard from "../../compnents/organisms/taskBoard/TaskBoard";
import DashBoardNavBar from "../../compnents/organisms/dashBoardNavBar/DashBoardNavBar";

import { TmsContext } from "../../context/TaskBoardContext";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const { userData } = useContext(TmsContext);

  useEffect(() => {
    setUser(userData.dataValues);
    localStorage.setItem("user", user);
  }, [user]);

  // const user = userData.dataValues;

  console.log("this is user data", userData);
  console.log("user: ", user);
  return (
    <div className="dashboard">
      <DashBoardNavBar>
        <div className="navContent">
          <NavIterms profilePicture={!user ? "" : user.picture}></NavIterms>
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
    </div>
  );
};

export default Dashboard;
