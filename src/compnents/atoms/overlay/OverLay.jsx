import React from "react";

import "./OverLay.css";

const OverLay = ({ action, zIndex = 3 }) => {
  return <div className="overlay" style={{ zIndex }} onClick={action} />;
};

export default OverLay;
