import React from "react";
// css import
import "./Dashboard.css";

// components import
import NavBar from "../../compnents/organisms/navBar/NavBar";
import NavIterms from "./nav_iterms/NavIterms";
// import { projectData } from "../../dummyData";
import SideNav from "../../compnents/organisms/sideNav/SideNav";
import ProjectDetialsBar from "../../compnents/organisms/projectDetialsBar/ProjectDetialsBar";
import TaskBoard from "../../compnents/organisms/taskBoard/TaskBoard";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <NavBar className="dashNav" padding={"2%"}>
        <div className="navContent">
          <NavIterms></NavIterms>
        </div>
      </NavBar>
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
