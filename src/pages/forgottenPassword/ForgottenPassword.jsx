import React, { useState, useEffect } from "react";
import "./ForgottenPassword.css";
import PulseLoader from "react-spinners/PulseLoader";
import logo from "../../../src/assets/logo.png";
import { AiOutlineMail } from "react-icons/ai";

function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Send request to server to initiate password reset
    fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok) {
          setSuccessMsg("Password reset email sent!");
        } else {
          throw new Error("Failed to initiate password reset");
        }
      })
      .catch((err) => {
        setErrorMsg(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="forgottenForm">
      {isLogoLoaded && <img alt="logo" src={logo} className="logoImg" />}
      <h2 className="forgottenTxt">Password Reset</h2>
      <form className="forgottenEmail" onSubmit={handleSubmit}>
        <label className="forgottenlabel" htmlFor="email">
          Enter your email address
        </label>
        <div className="inputIconGrp">
          <span className="inputIcon">
            <AiOutlineMail />
          </span>
          <input
            type="email"
            id="email"
            placeholder="gdb@gmail.com"
            className="forgottenInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <button className="forgottenBtn" type="submit">
            {isLoading ? <PulseLoader color="#ffffff" size={20} /> : "Submit"}
          </button>
        </div>
      </form>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      {successMsg && <p className="successMsg">{successMsg}</p>}
    </div>
  );
}

export default ForgottenPassword;
