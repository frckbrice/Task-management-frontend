import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");

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
              console.log("connect to the backend : registration");
              // setProfile(res.data);
              if (res && res.data) {
              }
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
                    console.log(response.data);
                    let data = {
                      email: response.data.email,
                    };
                    axios({
                      url: "https://tms-gdb08-0923.onrender.com/auth/login",
                      method: "POST",
                      data: data,
                      headers: {
                        "Content-Type": "application/json",
                      },
                    })
                      .then((response) => {
                        if (response && response.data) {
                          console.log(
                            "User successfully logged in! cookie: ",
                            response.data
                          );
                          navigate("/dashboard"); // navigate to onboarding page
                        }
                      })
                      .catch((err) =>
                        console.log("error loggin in", err.code, err.message)
                      );
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
    if (email && password) {
      if (password.length >= 6 && /\d/.test(password)) {
        
        let data = {
          email,
          password,
        };
        axios({
          url: "http://localhost:5000/auth/login",
          method: "POST",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res && res.data.status === 200) {
              console.log("Login successful!");
              navigate("/dashboard");// navigate to onboarding page
            }
          })
          .catch((err) => console.log("error login in", err.message));
      } else {
        setMessage(
          "Password must be at least 6 characters and contain at least one number."
        );
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

export default Login;

/*<div className="cred" id="signInDiv">
          <button onClick={login} className="signupButton">
            <FcGoogle className="mr" size={40} /> login in with Google
          </button>
        </div>*/