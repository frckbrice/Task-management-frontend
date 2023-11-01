import React, { useState, useContext, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OnBoarding.css";
import { TmsContext } from "../../context/TaskBoardContext";
import toast from "react-hot-toast";
import { server, conf } from "../../config";
import useServerInterceptor from "../../hooks/useServerInterceptor";
import PulseLoader from "react-spinners/PulseLoader";
import userAuth from "../../hooks/userAuth";
import { useStorage } from "../../hooks/useStorage";

function OnBoarding() {
  console.log("onboarding");
  const [currentStep, setCurrentStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [projectdescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [tasks, setTasks] = useState([]);

  const [projectToken, setProjectToken] = useState("");
  const [teamName, setTeamName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [move, setMove] = useState(true);

  const navigate = useNavigate();

  const { setProjectData, projectData, setTaskdata } = useContext(TmsContext);
  const { token } = useStorage("token");

  const location = useLocation();
  const { username } = userAuth();

  // const serverInterceptor = useServerInterceptor();

  if (projectData) console.log({ projectId: projectData });

  useEffect(() => {
    setErrMsg("");
  }, [errMsg]);

  (function () {
    if (location.pathname.includes("/onboarding") && !token)
      navigate("/dashboard", { replace: true });
  })();

  const handlePrev = () => setCurrentStep(currentStep - 1);

  function handleNext() {
    if (move) setCurrentStep(currentStep + 1);
  }

  //* add new task
  const addTask = async () => {
    setIsLoading(true);
    const data = {
      name: taskName,
      description: taskDescription,
      projectId: projectData?.id,
    };

    setProjectData(() => (projectData.onBoardingTask = data));
    toast.success("invitation successfully sent");
    // if (token) {
    //   try {
    //     const response = await serverInterceptor.post(
    //       "/tasks/onboarding",
    //       data,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Access-Control-Allow-Credentials": true,
    //           Accept: "application/json",
    //         },
    //       }
    //     );
    //     if (response && response.data && response.status === (200 || 201)) {
    //       toast.success("task successfully created");
    //       setTaskdata(response.data.data);
    //       setIsLoading(false);
    //     }
    //   } catch (err) {
    //     toast.error("Failed to create a task.");
    //     setIsLoading(false);
    //     console.log(err?.data?.message);
    //     if (!err.status) {
    //       setErrMsg("No Server Response");
    //     } else if (err.status === 400) {
    //       setErrMsg("Missing Username or Password");
    //     } else if (err.status === 401) {
    //       setErrMsg("Unauthorized");
    //     } else if (err.status === 403) {
    //       setErrMsg("Forbidden");
    //     } else {
    //       setErrMsg(err.data?.message);
    //       console.error(err.data?.message);
    //     }
    //   }
    // } else {
    //   console.log("no token, can not proceed");
    //   toast.error("Failed to create a task.");
    //   setIsLoading(false);
    // }
  };

  //*create project
  const createProject = async () => {
    setIsLoading(true);
    let data = {
      name: projectName,
      description: projectdescription,
      startDate,
      estimateEndDate: endDate,
      teamName,
    };

    setProjectData(data);
    toast.success("invitation successfully sent");
    // if (token) {
    //   try {
    //     const response = await serverInterceptor.post("/projects", data, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Access-Control-Allow-Credentials": true,
    //         Accept: "application/json",
    //       },
    //     });
    //     console.log(response);
    //     if (response && response.data.data) {
    //       toast.success("project successfully created");
    //       setProjectData(response.data.data);
    //       // setIsLoading(false);
    //     }
    //   } catch (err) {
    //     toast.error("Failed to create project.");
    //     console.log(err?.data?.message);
    //     if (!err.status) {
    //       setErrMsg("No Server Response");
    //     } else if (err.status === 400) {
    //       setErrMsg("Missing Username or Password");
    //     } else if (err.status === 401) {
    //       setErrMsg("Unauthorized");
    //     } else if (err.status === 403) {
    //       setErrMsg("Forbidden");
    //     } else {
    //       setErrMsg(err.data?.message);
    //       console.error(err.data?.message);
    //     }
    //     setIsLoading(false);
    //   }
    // } else {
    //   console.log("no token, cannot proceed");
    //   setMove(false);
    //   setIsLoading(false);
    // }
  };

  //*send invitation
  const handleInvite = async () => {
    // const emailContent = `${conf.server}/${projectToken}`;
    setIsLoading(true);
    const emailContent = `${conf.clientbaseURL}/`;
    // const emailContent = "localhost:3000/";
    let data = {
      projectToken: projectData.id,
      emails: inviteEmail, //need to create a list of invitees email
      emailContent,
    };

    setProjectData(() => (projectData.invitation = data));
    toast.success("invitation successfully sent");
    // try {
    //   const response = await serverInterceptor.post("/invitation", data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Access-Control-Allow-Credentials": true,
    //       Accept: "application/json",
    //     },
    //   });

    //   if (response && response.status === 200) {
    //     setIsLoading(false);
    //     toast.success("invitation successfully sent");
    //   }
    // } catch (err) {
    //   toast.error("Failed to send an invite.");
    //   console.log(err?.data?.message);
    //   setMove(false);
    //   setIsLoading(false);
    //   if (!err.status) {
    //     setErrMsg("No Server Response");
    //   } else if (err.status === 400) {
    //     setErrMsg("Missing Username or Password");
    //   } else if (err.status === 401) {
    //     setErrMsg("Unauthorized");
    //   } else if (err.status === 403) {
    //     setErrMsg("Forbidden");
    //   } else {
    //     setErrMsg(err.data?.message);
    //     console.error(err.data?.message);
    //   }
    // }
  };

  const errClass = errMsg ? "mgs" : "offscreen";

  if (isLoading) {
    <div className="loding">
      <PulseLoader color="#333" />
    </div>;
  }

  return (
    <div className="onBoarding">
      {currentStep === 0 && (
        <div className="welcome-card">
          <h1 className="wlcmHead">
            welcome! <span>{username}</span>{" "}
          </h1>
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
          <h2 className="createH2">Create a demo project</h2>
          <p className="createP">
            Input the name of your project and describe the purpose of that
            project.
          </p>
          <div className="projectCard">
            {/* <label>Name</label> */}
            <input
              placeholder="project name"
              type="text"
              id="projectname"
              name="project-name"
              className="form-input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <div className="date">
              <label>start date</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className="form-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="date">
              <label>end date</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                className="form-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="projectField">
              {/* <label>Description</label> */}
              <textarea
                placeholder="add project description..."
                id="projectdesc"
                className="forminput"
                name="projectdesc"
                value={projectdescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
            <div className="projectField">
              {/* <label>Team Name of The Poject</label> */}
              <input
                placeholder="Enter project team name"
                id="teamName"
                type="text"
                className="form-input"
                name="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div className="onboard-project-btn">
              <button
                onClick={() => {
                  createProject();
                }}
              >
                Create
              </button>
            </div>
            {errMsg && <p className={errClass}>{errMsg}</p>}
          </div>
          <div className="projectBtns Btns">
            <button onClick={handlePrev} className="btnNextPrev">
              Prev
            </button>
            <button onClick={handleNext} className="btnNextPrev">
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="create-task">
          <h2 className="crtTaskHead">Create tasks</h2>
          <p>
            Divide Your Project into tasks and assign it to a project member.
          </p>
          <h4> status: Backlogs</h4>
          <div className="createTask">
            <input
              type="text"
              id="taskinput"
              className="forminput"
              placeholder="add task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <button className="addtaskBtn" onClick={addTask}>
              Add Task
            </button>
          </div>
          <br />
          <textarea
            name="task decription"
            cols="30"
            id="taskfield"
            placeholder="add task description"
            rows="3"
            className="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          {errMsg && <p className={errClass}>{errMsg}</p>}
          <div className="Btn Btns">
            <button onClick={handlePrev}>Prev</button>
            <button
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="invitation">
          <h2 className="inviteHead">Invitation</h2>
          <p>Invite your team members, share task and get started</p>
          <p>Search example @name...</p>
          <div className="cardForm">
            <input
              type="name"
              id="invitemember"
              name="invitemember"
              placeholder="add email address"
              className="invitationInput"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <button className="inviteBtn" onClick={handleInvite}>
              Invite Member(s)
            </button>
            {errMsg && <p className={errClass}>{errMsg}</p>}
          </div>
          <div className="inviteBtns Btns">
            <button onClick={handlePrev} className="btnNextPrev">
              Prev
            </button>
            <button onClick={handleNext} className="btnNextPrev">
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="congratulation">
          <h3 className="congratH1">Congratulations!</h3>
          <h4>You have successfully created your first project on Tasktrec</h4>
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
