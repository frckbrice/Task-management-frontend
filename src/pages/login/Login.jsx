import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [triesLeft, setTriesLeft] = useState("");

    const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        console.log("login goood");
        // setUser(codeResponse);
        if (codeResponse) {
          axios
            .get(
              `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
              {
                headers: {
                  Authorization: `Bearer ${codeResponse.access_token}`,
                  Accept: "application/json",
                },
              }
            )
            .then((res) => {
              console.log("connect to the backend");
              // setProfile(res.data);
              let data = {
                username: res.data.name,
                email: res.data.email,
                picture: res.data.picture,
                id: res.data.id,
              };
              axios({
                url: "http://localhost:4000/auth/register",
                method: "POST",
                data: data,
                headers: {
                  "Content-Type": "application/json",
                },
              });
            })
            .then((res) => {
              if (res && res.data) {
                console.log("Form submitted successfully!");
                navigate("/onboarding"); // navigate to onboarding page
              }
            })
            .catch((err) => console.log("error", err));
        }
      },
      onError: (error) => {
        console.log("failed");
        console.log("Login Failed:", error);
      },
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Check if email and password match signup credentials
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      if (email !== storedEmail) {
        setMessage("Email does not match the Email you used to signup.");
      } else if (password !== storedPassword) {
        // Allow user to try entering the wrong password up to 3 times
        if (triesLeft > 0) {
          setTriesLeft(triesLeft - 1);
          setMessage(
            `Password does not match the Password you used to signup. ${triesLeft} tries left.`
          );
        } else {
          setMessage(
            "You have exceeded the maximum number of tries. Click 'Forgot Password?' to reset your password."
          );
        }
      } else {
        console.log("Login successful!");
      }
    } else {
      setMessage("Please fill in all required fields.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="formlogin">
        <form className="loginform" onSubmit={handleSubmit}>
          <div className="credential">
            {" "}
            <h2 className="loginform-h2">Login</h2>
            <p className="loginform-p">
              Welcome Back! Continue form where you left.
            </p>
          </div>

          <div className="email credential">
            <label className="loginformlabel" htmlFor="email">
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              className="loginforminput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password credential">
            <label className="loginformlabel" htmlFor="password">
              Password{" "}
            </label>
            <input
              className="loginforminput"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="mgs">{message}</p>
            <br />
          </div>
          <button type="submit" className="loginbtn credential">
            Login
          </button>
        </form>

        <div className="loginImg">
          <text>Don't have an Account...?</text>
          <br />
          <button type="submit" className="signbtn" onClick={() => {navigate("/signup")}}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
