import React, { useCallback, useContext, useEffect, useState } from "react";

import { TmsContext } from "../../../context/TaskBoardContext";

import toast from "react-hot-toast";
import { serverInterceptor } from "../../../config";
import { useStorage } from "../../../hooks/useStorage";
import "./ProjectDetialsBar.css";
// react icons imports
import { BsPersonAdd } from "react-icons/bs";

// component import
import DashActionBtn from "../../atoms/dashActionBtn/DashActionBtn";
import PopupModal from "../../molecules/popupModal/PopupModal";
import PopupForm from "../popupForm/PopupForm";
import OverLay from "../../atoms/overlay/OverLay";
// custom hook import

const ProjectDetialsBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [emails, setEmails] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [emailDescription, setEmailDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { selectedProject } = useContext(TmsContext);
  const { token } = useStorage("token");

  console.log({ token });
  console.log({ selectedProject });

  useEffect(() => {
    setDisabled(false);
  }, []);

  const closePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleInvite = useCallback(
    async (e) => {
      e.preventDefault();
      setDisabled(true);
      // const emailContent = `${conf.clientbaseURL}/`;
      const emailContent = "http://localhost:3000/";
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
        } catch (err) {
          // console.log("error sending invitation",   error?.data?.message);
          console.log("error sending invitation", err);
          toast.error("Failed to send an invite.");
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
        }
      } else {
        console.log("no token, cannot proceed");
        toast.error("Login before inviting members");
      }
    },
    [emailDescription, emails, selectedProject?.id, token]
  );

  const handleEmailChange = useCallback((e) => {
    setEmails(e.target.value);
  }, []);

  const handleDescription = useCallback((e) => {
    setEmailDescription(e.target.value);
  }, []);

  const errClass = errMsg ? "mgs" : "offscreen";

  return (
    <div className="bar-container">
      {showPopup && <OverLay action={closePopup} />}
      <div className="detialsBar">
        <div className="progress-section">
          {/* <div className="progess-icon">
            <GoProjectSymlink />
          </div> */}
          <h3>Web Enterprice</h3>
        </div>
        <div className="addMemberBtn">
          <DashActionBtn onClick={closePopup}>
            <span>
              <BsPersonAdd />
            </span>
            Add Members
          </DashActionBtn>
        </div>
      </div>
      {showPopup && (
        <div className="add-member-popup">
          <PopupModal title="Add new member" onClick={closePopup}>
            <PopupForm
              inputText={"add email address"}
              buttonText={"ADD"}
              textarea={"add email content"}
              onSubmit={handleInvite}
              value={emails}
              onchangeName={handleEmailChange}
              idemail="email"
              onchangeDescription={handleDescription}
              emailDescription={emailDescription}
              idDescription="emailDescription"
              disabled={disabled}
              errClass={errClass}
              errMsg={errMsg}
            />
          </PopupModal>
        </div>
      )}
    </div>
  );
};

export default ProjectDetialsBar;
