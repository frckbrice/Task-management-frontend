import React, { useState } from "react";
import "./ProgressBar.css";

const ProgressBar = () => {
  const [progress, setProgress] = useState(60);

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
