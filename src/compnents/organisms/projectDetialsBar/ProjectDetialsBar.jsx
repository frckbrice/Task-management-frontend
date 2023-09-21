import React, { useState } from "react";

import "./ProjectDetialsBar.css";
// react icons imports
import { BsPersonAdd } from "react-icons/bs";

// component import
import DashActionBtn from "../../atoms/dashActionBtn/DashActionBtn";
import PopupModal from "../../molecules/popupModal/PopupModal";
import PopupForm from "../popupForm/PopupForm";
import OverLay from "../../atoms/overlay/OverLay";
// custom hook import

const ProjectDetialsBar = () => {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="bar-container">
      {showPopup && <OverLay action={closePopup} />}
      <div className="detialsBar">
        <div className="progress-section">
          {/* <div className="progess-icon">
            <GoProjectSymlink />
          </div> */}
          <h3>Web Enterprice</h3>
        </div>
        <div className="addMemberBtn">
          <DashActionBtn onClick={closePopup}>
            <span>
              <BsPersonAdd />
            </span>
            Add Members
          </DashActionBtn>
        </div>
      </div>
      {showPopup && (
        <div className="add-member-popup">
          <PopupModal title="Add new member" onClick={closePopup}>
            <PopupForm
              inputText={"add email address"}
              buttonText={"ADD"}
              textarea={"add email content"}
            />
          </PopupModal>
        </div>
      )}
    </div>
  );
};

export default ProjectDetialsBar;
