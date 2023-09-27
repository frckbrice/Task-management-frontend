import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { TmsContext } from "../../context/TaskBoardContext";
import { conf, server } from "../../config";
import PulseLoader from "react-spinners/PulseLoader";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();
  const errorRef = useRef();

  const navigate = useNavigate();
  // const { setUserData } = useContext(TmsContext);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("login goood");
      setIsLoading(true);
      setUser(codeResponse);
      if (codeResponse) {
        axios
          .get(`${conf.googleapis}=${codeResponse.access_token}`, {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          })
          .then((res) => {
            console.log("connect to the backend");
            setProfile(res.data);
            let data = {
              username: res.data.name,
              email: res.data.email,
              picture: res.data.picture,
              id: res.data.id,
            };
            server
              .post("/auth/googleRegister", data, {
                headers: conf.headers,
              })
              .then((response) => {
                if (response && response.data) {
                  console.log("Form submitted successfully!", response.data);
                  // setUserData(response.data);
                  navigate("/onboarding"); // navigate to onboarding page
                  setIsLoading(false);
                }
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                setEmail("");
              })
              .catch((err) => {
                console.log("error registering a user", err);

                if (!err.status) {
                  setErrMsg("No Server Response");
                } else if (err.status === 400) {
                  setErrMsg("Missing Username or Password");
                } else if (err.status === 401) {
                  setErrMsg("Unauthorized");
                } else if (err.status === 403) {
                  setErrMsg("Forbidden");
                } if (err.status === 409) {
                  setErrMsg("Already register");
                } else {
                  setErrMsg(err.data?.message);
                  console.error(err.data?.message);
                }
              })
              .finally(() => setIsLoading(false));;
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
    setIsLoading(true);
    if (username && email && password && confirmPassword) {
      if (password.length >= 6 && /\d/.test(password)) {
        if (password === confirmPassword) {
          //authentication and backend connection
          let data = {
            username,
            email,
            password,
          };
          server
            .post("/auth/register", data, {
              headers: conf.headers,
            })
            .then((res) => {
              if (res && res.data) {
                console.log("Form submitted successfully!");
                // setUserData(res.data);
                navigate("/login"); // navigate to onboarding page
                
              }
              setUsername("");
              setPassword("");
              setConfirmPassword("");
              setEmail("");
            })
            .catch((err) => {
              console.log("error registering user", err);

              if (!err.status) {
                setErrMsg("No Server Response");
              } else if (err.status === 400) {
                setErrMsg("Missing Username or Password");
              } else if (err.status === 401) {
                setErrMsg("Unauthorized");
              } else if (err.status === 403) {
                setErrMsg("Forbidden");
              } else {
                setErrMsg(err.data?.message);
                console.error(err.data?.message);
              }
            })
            .finally(() => setIsLoading(false));
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

  const errClass = errMsg ? "mgs" : "offscreen";

  if (isLoading) {
    return (
      <div className="loading">
        <PulseLoader color="#0707a0" size={26} />
      </div>
    );
  }

  return (
    <div className="allForm">
      <NavBar />
      <div className="formBody">
        <div className="signupImg">
          <p className="signImgTxt">Already have an Account...!</p>
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

        <form className="signupForm">
          <p ref={errorRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <div className="innerform" onSubmit={handleSubmit}>
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
                ref={userRef}
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
            <div className="hrLine">
              <hr />
              Or <hr />
            </div>

            <div className="cred" id="signInDiv">
              <button onClick={login} className="googleLog">
                <FcGoogle className="google" size={40} /> Signup with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
