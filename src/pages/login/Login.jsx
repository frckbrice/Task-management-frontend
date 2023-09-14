import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";
import { useGoogleLogin } from "@react-oauth/goog
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

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
      if (password.length >= 6 && /\d/.test(password)) {
        console.log("Login successful!");
        navigate("/dashboard")
      }
      else {
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
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Signin;
=======
export default Login;
>>>>>>> 7d9758eecc29f03d62717ed683cc48e0c6971263
