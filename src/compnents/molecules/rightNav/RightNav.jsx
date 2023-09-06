import React from "react";
import "./RightNav.css";

function RightNav() {
  return (
    <div className="rightNav">
      <div>
        <ul>
          <li>
            <a href="index">Features</a>
          </li>
          <li>
            <a href="index">For Teams</a>
          </li>
          <li>
            <a href="index">Get Help</a>
          </li>
        </ul>
      </div>

      <div className="btn">
        <button className="reg">Sign Up</button>
        <button className="log">Log In</button>
      </div>
    </div>
  );
}

export default RightNav;
