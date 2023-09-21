import React from "react";

import favicon from "../../../assets/favicon.png";

import "./DashBoardNavBar.css";
import { Link } from "react-router-dom";

const DashBoardNavBar = ({children }) => {
  return (
    <div className="dashBoardNav">
      <Link to="/">
        <img src={favicon} alt="" className="favicon" />
      </Link>
      <div className="right-iterms">{children}</div>
    </div>
  );
};

export default DashBoardNavBar;
