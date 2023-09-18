import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./OnBoarding.css";
import axios from "axios";
import { TmsContext } from "../../context/TaskBoardContext";
import toast from "react-hot-toast";
import { server, conf } from "../../config";
import Task from "./task";

function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [projectdescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [projectToken, setProjectToken] = useState("");
  const [teamName, setTeamName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [move, setMove] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();
  const errorRef = useRef();

  const navigate = useNavigate();
  const { token, setProjectData, userData, projectData, setTaskdata } =
    useContext(TmsContext);

   const handlePrev = () => {
     setCurrentStep(currentStep - 1);
   };

   const handleNext = () => {
     if (move) {
       setCurrentStep(currentStep + 1);
     }
   };

  const addTask = async () => {
    setIsLoading(true);
    const data = {
      name: taskName,
      description: taskDescription,
      projectId: projectData.id,
    };
    if (token) {
      try {
        const response = await server.post("/projects", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (response && response.data) {
          toast.success("task successfully created");
          setTaskdata(response.data.data);
          setIsLoading(false);
        }
      } catch (err) {
        toast.error("Failed to create a task.");
         setIsLoading(false);
        console.log(err?.data?.message);
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
      console.log("no token, can not proceed");
      toast.error("Failed to create a task.");
      setIsLoading(false);
    }
  };

  const createProject = async () => {
    let data = {
      name: projectName,
      description: projectdescription,
      startDate,
      estimateEndDate: endDate,
      teamName,
    };

    if (token) {
      const response = await server.post("/projects", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      console.log(response);
      if (response && response.data) {
        toast.success("project successfully created", response.data.data);
        setProjectData(response.data.data);
        setProjectToken(response.data.data.id);
      } else {
        toast.error("Failed to create project.");
        console.log(error?.data?.message);
        setMove(false);
      }
    } else {
      console.log("no token, cannot proceed");
      // setMove(false);
    }
  };

  const handleInvite = async () => {
    // const emailContent = `${conf.server}/${projectToken}`;

    const emailContent = `${conf.serverbaseURL}/`;

    let data = {
      token: projectToken,
      emails: `${inviteEmail}`, //need to create a list of invitees email
      emailContent,
    };

    const response = await server.post("/invitation", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (response && response.data) {
      toast.success("invitation successfully sent", response.data);
    } else {
      toast.error("Failed to send an invite.");
      console.log(error?.data?.message);
      setMove(false);
    }
  };

  const errClass = errMsg ? "mgs" : "offscreen";

 

  return (
    <div className="onBoarding">
      {currentStep === 0 && (
        <div className="welcome-card">
          <h1>welcome! {userData.username}</h1>
          <p>
            We are delighted to have you on board. We built{" "}
            <span>TaskTrec</span> to help you or you and your team stay
            organised and to automate work.
          </p>
          <h4>Let's guide you to get started</h4>
          <div className="Btn Btns">
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Skip
            </button>
            <button onClick={handleNext}>Get Started</button>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="create-project">
          <h2 className="createH2">Create your first project</h2>
          <p className="createP">
            Input the name of your project and describe the purpose of that
            project.
          </p>
          <div className="projectCard">
            <label>Name</label>
            <input
              type="text"
              id="projectname"
              name="project-name"
              className="form-input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />{" "}
            <br />
            <label>starting date : </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              className="form-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <br />
            <label>estimate ending date : </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              className="form-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <br />
            <div className="projectField">
              <label>Description</label>
              <textarea
                id="projectdesc"
                className="forminput"
                name="projectdesc"
                value={projectdescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
            <br />
            <div className="projectField">
              <label>Team Name of The Poject</label>
              <input
                id="teamName"
                type="text"
                className="form-input"
                name="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
          </div>
          <div className="projectBtns Btns">
            <button onClick={handlePrev}>Prev</button>
            <button
              onClick={() => {
                handleNext();
                createProject();
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        // <>
        //   <Task />

        // </>
        <div className="create-task">
          <p ref={errorRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <h2>Create tasks</h2>
          <p>
            Divide Your Project into tasks or assign the project to a member if
            it can be handled by just one person
          </p>
          <h4>Eg: todo</h4>
          <div>
            <label>Task name</label>
            <input
              id="taskName"
              type="text"
              className="form-input"
              name="taskName"
              value={taskName}
              ref={userRef}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <br />
          <div className="projectField">
            <label>Task description</label>
            <textarea
              id="taskDescription"
              type="text"
              className="form-input"
              name="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <button className="addtaskBtn" onClick={addTask}>
            Add Task
          </button>
          {error && <p className="createtaskErr">{error}</p>}
          <div className="projectBtns Btns">
            <button onClick={handlePrev}>Prev</button>
            <button
              onClick={() => {
                handleNext()
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="invitation">
          <h2>Invitation</h2>
          <p>Invite your team members, share task and get started</p>
          <p>Search example @name...</p>
          <div className="cardForm">
            <input
              type="name"
              id="invitemember"
              name="invitemember"
              placeholder="add email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <button className="inviteBtn" onClick={handleInvite}>
              Invite Member(s)
            </button>
          </div>
          <div className="inviteBtns Btns">
            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="congratulation">
          <h1>Congratulations! "daisy"</h1>
          <h3>You have created your first project on Tasktrec</h3>
          <p className="congratP">
            Explore more fields on your workspace like Project progress,
            sharing, and generating reports.
          </p>
          <div className="Btn Btns">
            <button onClick={handlePrev}>Prev</button>
            <button
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OnBoarding;
