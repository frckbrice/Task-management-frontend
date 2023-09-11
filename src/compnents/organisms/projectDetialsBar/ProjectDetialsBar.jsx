import React, { useState } from "react";

import "./ProjectDetialsBar.css";
// react icons imports
import { BsPersonAdd } from "react-icons/bs";

// component import
import DashActionBtn from "../../atoms/dashActionBtn/DashActionBtn";
import PopupModal from "../../molecules/popupModal/PopupModal";
import PopupForm from "../popupForm/PopupForm";
// custom hook import

const ProjectDetialsBar = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bar-container">
      <div className="detialsBar">
        <div className="progress-section">
          {/* <div className="progess-icon">
            <GoProjectSymlink />
          </div> */}
          <h3>Web Enterprice</h3>
        </div>
        <div className="addMemberBtn">
          <DashActionBtn onClick={() => setShowPopup((prev) => !prev)}>
            <span>
              <BsPersonAdd />
            </span>
            Add Members
          </DashActionBtn>
        </div>
      </div>
      {showPopup && (
        <div className="add-member-popup">
          <PopupModal
            title="Add new member"
            onClick={() => setShowPopup(false)}
          >
            <PopupForm />
          </PopupModal>
        </div>
      )}
    </div>
  );
};

export default ProjectDetialsBar;
