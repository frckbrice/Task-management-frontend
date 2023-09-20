import React from "react";
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

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashBoardNavBar>
        <div className="navContent">
          <NavIterms/>
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
