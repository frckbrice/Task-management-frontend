import React, { useState } from "react";
import "./WelcomeMember.css";
import { useNavigate } from "react-router-dom";

function WelcomeMember() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save name and contact to database
    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="welcomePage">
      <h2 className="welcomeTitle">Welcome to Project XYZ</h2>
      <p className="welcomeDesc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
        ligula sit amet ex bibendum consectetur.
      </p>
      <form className="welcomeForm" onSubmit={handleSubmit}>
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
          Skills
        </label>
        <textarea
          type="text"
          id="skill"
          placeholder="Enter your skills"
          className="welcomeInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className="welcomeBtn" type="submit">
          Accept
        </button>
      </form>
    </div>
  );
}

export default WelcomeMember;
