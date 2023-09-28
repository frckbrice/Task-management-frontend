import React, { useState } from "react";
import "./RightNav.css";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

function RightNav() {
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="rightNav">
      
      <div id="mobile">
        <i
          id="bar"
          className={clicked ? "fa fa-times" : "fa fa-bars"}
          onClick={handleClick}
        ></i>
      </div>

      <div
        id="righttxtbtn"
        className={clicked ? "#righttxtbtn active" : "#righttxtbtn"}
      >
        <div className="righttxt">
          <ul>
            <li>
              <a href="/features">Features</a>
            </li>
            <li>
              <a href="/teams">For Teams</a>
            </li>
            <li>
              <a href="/help">Get Help</a>
            </li>
          </ul>
        </div>

        <div className="btn">
          <button
            className="reg"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
          <button
            className="log"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightNav;
