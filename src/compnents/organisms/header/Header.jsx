import React from "react";
import "./Header.css";
import HeaderImg from "../../../assets/taskimage.png";

function Header() {
  return (
    <div className="header">
      <div className="HeaderTxt">
        <h1 className="head1">
          Simple, Yet Powerful. Tasktrec Helps You Stay Organised And On Track
          With Your Tasks.
        </h1>
        <h3 className="head3">Sign Up for Tasktrec today and start getting things done!</h3>
        <button className="Started btn">Get Started</button>
      </div>

      <div className="HeaderImg">
        <img src={HeaderImg} alt="HeaderImg" />
      </div>

    </div>
  );
}

export default Header;
