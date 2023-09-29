import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { TmsContext } from "../../context/TaskBoardContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { conf, server } from "../../config";
import PulseLoader from "react-spinners/PulseLoader";
import toast from "react-hot-toast";
import usePersist from "../../hooks/usePersist";
import { useStorage } from "../../hooks/useStorage";

// import Task from "../onboarding/task";

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
  const [move, setMove] = useState(false);

  const { setProfilePict } = useContext(TmsContext);
  const { setlsData } = useLocalStorage("setRefreshToken", " ");
  const { setStorToken } = useStorage("token", " ");

  useEffect(() => {
    // userRef.current.focus();
    if (move) navigate("/onboarding");
  }, [move, navigate]);

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
            setProfile(res.data);
            if (res && res.data) {
              console.log("connection to the backend : registration");
              let data = {
                username: res.data.name,
                email: res.data.email,
                picture: res.data.picture,
                id: res.data.id,
              };
              console.log(data);
              setProfilePict(res.data.picture);
              server
                .post("/auth/googleRegister", data, {
                  headers: conf.headers,
                })
                .then((resp) => {
                  if (resp && resp.data) {
                    console.log("registered data: ", resp.data);

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
                        {
                          withCredentials: true,
                          mode: "cors",
                        }
                      )
                      .then((response) => {
                        if (
                          response &&
                          response.data &&
                          response.status === 200
                        ) {
                          setMove(true);
                          console.log(
                            "User successfully logged in! tokens: ",
                            response.data
                          );
                          toast.success("User successfully logged in");
                          setStorToken(response.data.accessToken);

                          setlsData(response.data.refreshToken);
                          navigate("/onboarding");
                          setIsLoading(false);
                          // navigate to onboarding page
                        }
                        setEmail("");
                        setPassword("");
                      })
                      .catch((err) => {
                        console.log("error loging in", err.code, err.message);
                        toast.error("Failed to log in");
                        setMove(false);

                        if (!err.response.status) {
                          setErrMsg("No Server Response");
                        } else if (err.response.status === 400) {
                          setErrMsg("Missing Username or Password");
                        } else if (err.response.status === 401) {
                          setErrMsg("Unauthorized");
                        } else if (err.response.status === 403) {
                          setErrMsg("Forbidden");
                        } else if (err.response.status === 409) {
                          setErrMsg("This email already exist");
                        } else {
                          setErrMsg(err.data?.message);
                          console.error(err.response.data?.message);
                        }
                      })
                      .finally(() => setIsLoading(false));
                  }
                })
                .catch((err) =>
                  console.log("error registering to db", err.code, err.message)
                )
                .finally(() => setIsLoading(false));
            }
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

  // console.log(user);
  // console.log(profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("\nhandle submit fired\n");
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
              withCredentials: true,
              mode: "cors",
            }
          )
          .then((res) => {
            if (res && res.data && res.status === (200 || 201)) {
              setMove(true);
              console.log("Login successful!", res.data);
              setStorToken(res.data.accessToken);
              setlsData(res.data.refreshToken);
              navigate("/onboarding"); // navigate to onboarding page
              setIsLoading(false);
            }
            setEmail("");
            setPassword("");
          })
          .catch((err) => {
            setMove(false);

            console.log("error login in", err.message);

            if (!err.response.status) {
              setErrMsg("No Server Response");
            } else if (err.response.status === 400) {
              setErrMsg("Missing Username or Password");
            } else if (err.response.status === 401) {
              setErrMsg("Unauthorized");
            } else if (err.response.status === 403) {
              setErrMsg("Forbidden");
            } else if (err.response.status === 409) {
              setErrMsg("This email already exist");
            } else {
              setErrMsg(err.data?.message);
              console.error(err.response.data?.message);
            }
          })
          .finally(() => setIsLoading(false));

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
    return (content = (
      <div className="loading">
        <PulseLoader color="#0707a0" size={26} />
      </div>
    ));
  } else {
    content = (
      <div className="allForm">
        <NavBar />

        <div className="formlogin">
          <form className="loginform" onSubmit={handleSubmit}>
            <p ref={errorRef} className={errClass} aria-live="assertive">
              {errMsg}
            </p>
            <div className="innerform">
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
                  autocompleted="off"
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
              <div>
                Forgotten password?{" "}
                <Link to="/forgottenpassword">Reset it</Link>
              </div>
              <div className="hrLine">
                <hr />
                Or <hr />
              </div>

              <button onClick={login} className="googleLog">
                <FcGoogle className="google" size={40} /> Login with Google
              </button>
            </div>
          </form>

          <div className="loginImg">
            <h3 className="loginImgTxt">Don't have an Account...?</h3>
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
          </div>
        </div>
      </div>
    );
  }

  return content;
}

export default Login;
