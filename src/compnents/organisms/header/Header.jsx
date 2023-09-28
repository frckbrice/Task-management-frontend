import React from "react";
import "./Header.css";
import HeaderImg from "../../../assets/taskimage.png";
import Button from "../../atoms/button/Button";

function Header() {
  
  return (
    <div className="header">
      <div className="HeaderTxt">
        <h1 className="headone">
          Simple, Yet Powerful. Tasktrec Helps You Stay Organised And On Track
          With Your Tasks.
        </h1>
        <p className="par">
          Sign Up for Tasktrec today and start getting things done!
        </p>
        <Button />
      </div>

      <div className="HeaderImg">
        <img className="img1" src={HeaderImg} alt="HeaderImg" />
      </div>
    </div>
  );
}

export default Header;
