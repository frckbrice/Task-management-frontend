import React from "react";
// css import
import "./Dashboard.css";

// components import
import NavBar from "../../compnents/organisms/navBar/NavBar";
import NavIterms from "./nav_iterms/NavIterms";
import { projectData } from "../../dummyData";
import SideNav from "../../compnents/organisms/sideNav/SideNav";

const Dashboard = () => {
  console.log(projectData);

  return (
    <div className="dashboard">
      <NavBar className="dashNav">
        <div className="navContent">
          <NavIterms></NavIterms>
        </div>
      </NavBar>
      <div className="workSpace">
        <SideNav />
      </div>
    </div>
  );
};

export default Dashboard;
