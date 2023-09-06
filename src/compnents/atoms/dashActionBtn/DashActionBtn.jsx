import React from "react";
import "./DashActionBtn.css";
const DashActionBtn = ({ text, children, onClick, className }) => {
  return (
    <div className={className}>
      <button onClick={onClick} className="DashActionBtn">
        {children}
        {text}
      </button>
    </div>
  );
};

export default DashActionBtn;
