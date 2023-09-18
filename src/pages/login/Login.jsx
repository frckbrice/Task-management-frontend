import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { TmsContext } from "../../context/TaskBoardContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { conf, server } from "../../config";
import PulseLoader from "react-spinners/PulseLoader";

import Task from "../onboarding/task";

function Login() {
  const navigate = useNavigate();

  const userRef = useRef();
  const errorRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useContext(TmsContext);
  const { setlsData } = useLocalStorage("token", "");

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  let content;
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
            console.log("connection to the backend : registration");
            setProfile(res.data);
            if (res && res.data) {
            }
            let data = {
              username: res.data.name,
              email: res.data.email,
              picture: res.data.picture,
              id: res.data.id,
            };
            console.log(data);
            server
              .post("/auth/googleRegister", data, {
                headers: conf.headers,
              })
              .then((resp) => {
                if (resp && resp.data) {
                  console.log(resp.data);
                  let data = {
                    email: resp.data,
                  };
                  server
                    .post(
                      "/auth/googleLogin",
                      data,
                      {
                        headers: conf.headers,
                      },
                      { credentials: true, mode: "cors" }
                    )
                    .then((response) => {
                      if (response && response.data) {
                        console.log(
                          "User successfully logged in! cookie: ",
                          response.data
                        );
                        setToken(response.data.accessToken);
                        setlsData(response.data);
                        navigate("/onboarding"); // navigate to onboarding page
                        setIsLoading(false);
                      }
                    })
                    .catch((err) => {
                      console.log("error loggin in", err.code, err.message);
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
                    });
                }
              })
              .catch((err) =>
                console.log("error registering to db", err.code, err.message)
              );
          })
          .catch((err) =>
            console.log(
              "error fetching user data from google",
              err.code,
              err.message
            )
          );
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
    if (email && password) {
      if (password.length >= 6 && /\d/.test(password)) {
        let data = {
          email,
          password,
        };
        server
          .post(
            "/auth/login",
            data,
            {
              headers: conf.headers,
            },
            {
              credentials: true,
              mode: "cors",
            }
          )
          .then((res) => {
            if (res && res.data) {
              console.log("Login successful!", res.data);
              setToken(res.data.accessToken);
              setlsData(res.data);
              navigate("/onboarding"); // navigate to onboarding page

              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log("error login in", err.message);
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
          });

        //* add error message later
      } else {
        setMessage(
          "Password must be at least 6 characters and contain at least one number."
        );
      }
    } else {
      setMessage("Please fill in all required fields.");
    }
  };

  const errClass = errMsg ? "mgs" : "offscreen";

  if (isLoading) {
    content = (
      <div className="loding">
        <PulseLoader color="#333" />
      </div>
    );
  } else {
    content = (
      <div>
        <NavBar />

        <div className="formlogin">
          <p ref={errorRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
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
                ref={userRef}
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
            <h3>Don't have an Account...?</h3>
            <br />
            <button
              type="submit"
              className="signbtn"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </button>
            <button onClick={login} className="signupButton">
              <FcGoogle className="mr" size={40} /> login in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return content;
}

export default Login;

/*<div className="cred" id="signInDiv">
          <button onClick={login} className="signupButton">
            <FcGoogle className="mr" size={40} /> login in with Google
          </button>
        </div>*/
