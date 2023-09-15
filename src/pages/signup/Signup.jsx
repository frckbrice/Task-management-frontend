import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && email && password && confirmPassword) {
      if (password.length >= 6 && /\d/.test(password)) {
        if (password === confirmPassword) {
          // add authentication and backend connection here
          console.log("Form submitted successfully!");
          navigate("/onboarding"); // navigate to onboarding page
        } else {
          setMessage("Passwords do not match");
        }
      } else {
        setMessage(
          "Password must be at least 6 characters and contain at least one number."
        );
      }
    } else {
      setMessage("Please fill in all the fields provided above.");
    }
  };

  return (
    <div className="allForm">
      <NavBar />
      <div className="formBody">
        <div className="signupImg">
          <text>Already have an Account...!</text>
          <br />
          <button
            type="submit"
            className="logbtn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>

        <form className="signupForm" onSubmit={handleSubmit}>
          <div className="cred">
            {" "}
            <h2 className="signupform-h2">Sign up</h2>
            <p className="signupform-p">
              Sign up for Tasktrec today and start getting things done!
            </p>
          </div>

          <div className="username cred">
            <label className="formlabel" htmlFor="username">
              User Name{" "}
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="forminput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="email cred">
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

          <div className="password cred">
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
          <div className="confirm-password cred">
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
            <p className="message">{message}</p>
            <br />
          </div>

          <button
            type="submit"
            className="signupbtn cred"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
