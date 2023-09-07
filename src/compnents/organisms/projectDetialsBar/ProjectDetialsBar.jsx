import React from "react";

import "./ProjectDetialsBar.css";
// react icons imports
import { BsPersonAdd } from "react-icons/bs";
import { GoProjectSymlink } from "react-icons/go";

// component import
import DashActionBtn from "../../atoms/dashActionBtn/DashActionBtn";

const ProjectDetialsBar = () => {
  return (
    <div className="detialsBar">
      <div className="progress-section">
        <div className="progess-icon">
          <GoProjectSymlink />
        </div>
        <h3>Web Enterprice</h3>
      </div>
      <div className="addMemberBtn">
        <DashActionBtn>
          <span>
            <BsPersonAdd />
          </span>
          Add Members
        </DashActionBtn>
      </div>
    </div>
  );
};

export default ProjectDetialsBar;
