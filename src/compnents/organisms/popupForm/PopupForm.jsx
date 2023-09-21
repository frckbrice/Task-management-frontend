import React, { useContext, useState } from "react";

import "./PopupForm.css";
import { TmsContext } from "../../../context/TaskBoardContext";
import { conf, server } from "../../../config";
import toast from "react-hot-toast";
import { serverInterceptor } from "../../../config";

const PopupForm = ({ inputText, textarea, onSubmit, buttonText }) => {
  const [emails, setEmails] = useState("");
  const [emailDescription, setEmailDescription] = useState("");

  const { token, projectData } = useContext(TmsContext);

  const handleInvite = async () => {
    const emailContent = `${conf.serverbaseURL}/`;

    let data = {
      projectToken: projectData.id,
      emails,
      emailContent,
      emailDescription,
    };

    try {
       const response = await serverInterceptor.post("/invitation", data, {
         headers: {
           Authorization: `Bearer ${token}`,
           "Access-Control-Allow-Credentials": true,
           Accept: "application/json",
         },
       });
      if (response && response.data) {
        toast.success("invitation successfully sent", response.data);
      }
    } catch (error) {
      console.log(error?.data?.message);
      // setMove(false);
      // setIsLoading(false);
        toast.error("Failed to send an invite.", error?.data?.message);
    }
  };

  return (
    <div>
      <form className="popup-form" action="" onSubmit={onSubmit}>
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
          onChange={(e) => setEmailDescription(e.target.value)}
        />
        <button onClick={handleInvite}>{buttonText}</button>
      </form>
    </div>
  );
};

export default PopupForm;
