import React, { useContext, useState } from "react";

import "./PopupForm.css";
import { TmsContext } from "../../../context/TaskBoardContext";
import { conf, server } from "../../../config";
import toast from "react-hot-toast";
import { serverInterceptor } from "../../../config";

const PopupForm = ({ inputText, textarea, onSubmit, buttonText }) => {
  const [emails, setEmails] = useState("");
  const [emailDescription, setEmailDescription] = useState("");

  const { token, selectedProject } = useContext(TmsContext);

  const handleInvite = async (e) => {
    e.preventDefault();
    const emailContent = `${conf.serverbaseURL}/`;

    let data = {
      projectToken: selectedProject?.id,
      emails,
      emailContent,
      emailDescription,
    };
    if (token) {
      try {
        const response = await serverInterceptor.post("/invitation", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Credentials": true,
            Accept: "application/json",
          },
        });
        if (response && response.data && response.status === (200 || 201)) {
          toast.success("invitation successfully sent", response.data);
        }
      } catch (error) {
        console.log("error sending invitation",   error?.data?.message);
        toast.error("Failed to send an invite.", error?.data?.message);
      }
    } else {
      console.log("no token, cannot proceed");
      toast.error("Login before inviting members");
    }
  };

  return (
    <div>
      <form className="popup-form" onSubmit={handleInvite}>
        <input
          type="text"
          value={emails}
          placeholder={inputText}
          onChange={(e) => setEmails(e.target.value)}
          id="email"
        />
        <textarea
          name=""
          value={emailDescription}
          id="emailDescription"
          placeholder={textarea}
          cols={10}
          onChange={(e) => setEmailDescription(e.target.value)}
        />
        <button>{buttonText}</button>
      </form>
    </div>
  );
};

export default PopupForm;
