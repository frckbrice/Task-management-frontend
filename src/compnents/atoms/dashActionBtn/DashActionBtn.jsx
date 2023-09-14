import React from "react";
import "./DashActionBtn.css";
const DashActionBtn = ({ text, children, onClick, className }) => {
  return (
    <div className={className && "action_btn"}>
      <button onClick={onClick} className="DashActionBtn">
        {children}
        {text}
      </button>
    </div>
  );
};

export default DashActionBtn;
