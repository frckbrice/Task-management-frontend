import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { TmsContext } from "../../context/TaskBoardContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  const { setUserData } = useContext(TmsContext);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("login goood");
      setUser(codeResponse);
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
            setProfile(res.data);
            let data = {
              username: res.data.name,
              email: res.data.email,
              picture: res.data.picture,
              id: res.data.id,
            };
            axios({
              url: "https://tms-gdb08-0923.onrender.com/auth/register",
              method: "POST",
              data: data,
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (response && response.data) {
                  console.log("RESPONCE: ", response.data.dataValues);
                  console.log("Form submitted successfully!", response.data);
                  setUserData(response.data);
                  navigate("/onboarding"); // navigate to onboarding page
                }
              })
              .catch((err) => console.log("error registering a user", err));
          })
          .catch((err) => console.log("error fetching user from google", err));
      }
    },
    onError: (error) => {
      console.log("failed");
      console.log("Login Failed:", error);
    },
  });

  console.log(user);
  console.log(profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && email && password && confirmPassword) {
      if (password.length >= 6 && /\d/.test(password)) {
        if (password === confirmPassword) {
          //authentication and backend connection
          let data = {
            username,
            email,
            password,
          };
          axios({
            url: "https://tms-gdb08-0923.onrender.com/auth/register",
            method: "POST",
            data: data,
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res && res.data) {
                console.log("Form submitted successfully!");
                setUserData(res.data);
                navigate("/onboarding"); // navigate to onboarding page
              }
            })
            .catch((err) => console.log("error registering user", err));
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
          <div className="cred" id="signInDiv">
            <button onClick={login} className="signupButton">
              <FcGoogle className="mr" size={40} /> Signup with Google
            </button>
          </div>
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
              Full Name{" "}
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
