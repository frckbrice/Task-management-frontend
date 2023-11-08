import React, { useEffect, useState } from "react";
import "./WelcomeMember.css";
import { useNavigate, useParams } from "react-router-dom";
import { serverInterceptor } from "../../config";
import { useStorage } from "../../hooks/useStorage";
import PulseLoader from "react-spinners/PulseLoader";

function WelcomeMember() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [skills, setSkills] = useState("");
  const [move, setMove] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams();
  const { token } = useStorage("token");


  useEffect(() => {
    if (move) navigate("/dashboard");
  }, [move, navigate]);

   const [isLoading, setIsLoading] = useState(false);

  // console.log(invitationId.id)

  const handleSubmit = () => {
   setIsLoading(true);
    // Save name and contact to database
    // Redirect to dashboard
    const data = {
      name,
      contact,
      skills,
      accepted: true,
      invitationId : id,
    };

    serverInterceptor
      .post("/invitation/confirm", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Request-Headers": "authorization,content-type",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response && response.data) {
          setMove(true);
          console.log(response.data);
         
          setContact("");
          setName("");
          setSkills("");
          setIsLoading(false);
          
        }
      })
      .catch((err) => {console.log("Error confirm invitation process", err);
      setIsLoading(false);
    });
  };



  return (
    <div className="welcomePage">
      {isLoading && <PulseLoader color="#0707a0" size={26} />}
      <h2 className="welcomeTitle">Welcome to TASKTREC APP</h2>
      <p className="welcomeDesc">
        Please Kindly Fill the form below to confirm your acceptation to take
        part to the the project conerned.
      </p>
      <div className="welcomeForm">
        <label className="welcomeLabel" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          className="welcomeInput"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="welcomeLabel" htmlFor="contact">
          Contact
        </label>
        <input
          type="text"
          id="contact"
          placeholder="Enter your contact info"
          className="welcomeInput"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <label className="welcomeLabel" htmlFor="contact">
          Some more Skills
        </label>
        <textarea
          type="text"
          id="skill"
          placeholder="Enter your skills"
          className="welcomeInput"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <div>
          <button className="welcomeBtn" type="submit" onClick={handleSubmit}>
            Accept
          </button>{" "}
          <br />
          {/* <button
            className="welcomeBtn"
            type="button"
            onClick= {navigate("/")}
          >
            Decline
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default WelcomeMember;
