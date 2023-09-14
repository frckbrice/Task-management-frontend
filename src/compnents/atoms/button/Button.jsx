import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";

function Button() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="StrtBtn"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Button;
