import React, { useState } from "react";
import "./Signup.css";
import Image from "../../assets/signupImg.png";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName && email && password && confirmPassword) {
      if (password.length >= 6 && /\d/.test(password)) {
        if (password === confirmPassword) {
          // add authentication and backend connection here
          console.log("Form submitted successfully!");
        } else {
          alert("Passwords do not match.");
        }
      } else {
        alert(
          "Password must be at least 6 characters and contain at least one number."
        );
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="formBody">
      <div className="signupImg">
        <img src={Image} alt="signup" />
        <div className="overlay">
          <text>Already have an Account...!</text>
          <button type="submit" className="logbtn">
            Login
          </button>
        </div>
      </div>

      <form className="signupForm" onSubmit={handleSubmit}>
        <div className="fullname">
          <label className="formlabel" htmlFor="fullName">
            Full Name{" "}
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="forminput"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="email">
          <label className="formlabel" htmlFor="email">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            className="forminput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="password">
          <label className="formlabel" htmlFor="password">
            Password{" "}
          </label>
          <input
            className="forminput"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="confirm-password">
          <label className="formlabel" htmlFor="confirmPassword">
            Confirm Password{" "}
          </label>
          <input
            className="forminput"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="signupbtn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;