import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import logo from "../../../src/assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      setIsLogoLoaded(true);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    // Send request to server to update password
    fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: location.state.email, password }),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/login");
        } else {
          throw new Error("Failed to reset password");
        }
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="resetForm">
      {isLogoLoaded && <img alt="logo" src={logo} className="logoImg" />}
      <h2 className="resetTxt">Reset Password</h2>
      <p className="resetP">
        Set your new password for your account so that you can login and access
        all the features.
      </p>
      <form className="resetPassword" onSubmit={handleSubmit}>
        <div className="flexme">
          <label className="resetLabel" htmlFor="password">
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter new password"
            className="resetInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flexme">
          <label className="resetLabel" htmlFor="confirmPassword">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm new password"
            className="resetInput"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="resetBtn" type="submit">
          Reset Password
        </button>
      </form>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </div>
  );
}

export default ResetPassword;
