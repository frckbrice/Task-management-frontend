import React, { useState, useContext } from "react";
import "./ProgressBar.css";
// project progress context import
import { ProgressContext } from "../../../context/ProgressContext";

const ProgressBar = () => {
  const { progress } = useContext(ProgressContext);

  const getColor = () => {
    if (progress < 40) {
      return "#ff0000";
    } else if (progress < 70) {
      return "#ffa500";
    } else {
      return "#2ecc71";
    }
  };

  return (
    <div className="bar-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%`, backgroundColor: getColor() }}
        ></div>
      </div>
      <div className="progress-label">
        {progress}% <span>Completed</span>
      </div>
    </div>
  );
};

export default ProgressBar;
