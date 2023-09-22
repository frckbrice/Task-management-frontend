import React, { useState, useEffect } from "react";
import "./VerifyEmail.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../src/assets/logo.png";

function VerifyEmail() {
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      setIsLogoLoaded(true);
    };
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Send request to server to verify code
    axios("/api/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/resetPassword");
        } else {
          throw new Error("Incorrect code entered");
        }
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="verifyForm">
      {isLogoLoaded && <img alt="logo" src={logo} className="logoImag" />}
      <h2 className="verifyTxt">Verify Your Email</h2>
      <form className="verifyCode" onSubmit={handleSubmit}>
        <p className="verifyLabel">
          A verification code has been sent to your Email, please enter the 4
          digit code to continue.
        </p>
        <input
          type="text"
          id="code"
          placeholder="0000"
          className="verifyInput"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <div>
          <button className="verifyBtn" type="submit">
            Verify Code
          </button>
        </div>
      </form>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </div>
  );
}

export default VerifyEmail;
