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
import ProgressBar from "../progressBar/ProgressBar";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../../hooks/userAuth";
// custom hook import

const ProjectDetialsBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [emails, setEmails] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [emailDescription, setEmailDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedProject, openAddList, setOpenAddList } =
    useContext(TmsContext);
  const { token } = useStorage("token");

  console.log({ token });
  console.log({ selectedProject });

  const { username, email, picture } = useAuth();

  useEffect(() => {
    setDisabled(false);
    setErrMsg("");
  }, []);

  const closePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleInvite = useCallback(
    async (e) => {
      e.preventDefault();
      setErrMsg("");
      setDisabled(true);
      setIsLoading(true);
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
            toast.success("invitation successfully sent");
            setIsLoading(false);
          }
        } catch (err) {
          // console.log("error sending invitation",   error?.data?.message);
          setIsLoading(false);

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
        setIsLoading(false);
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
          <h3>{selectedProject.name}</h3>
          <ProgressBar />
        </div>
        <div className="author">
          Working space of{" "}
          <span className="author">{username || email || picture}</span>
        </div>
        <div className="actionDiv">
          <div className="addMemberBtn">
            <DashActionBtn onClick={closePopup}>
              <span>
                <BsPersonAdd />
              </span>
              Add Members
            </DashActionBtn>
          </div>
          <div>
            <button
              className="add-listp"
              onClick={() => setOpenAddList((openAddList) => !openAddList)}
            >
              add list
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="add-member-popup">
          <PopupModal title="Add new member" onClick={closePopup}>
            {isLoading && <PulseLoader color="#0707a0" size={15} />}
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
