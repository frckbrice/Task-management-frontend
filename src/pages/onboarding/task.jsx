import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OnBoarding.css";
import PropTypes from "prop-types";
import { TmsContext } from "../../context/TaskBoardContext";
import toast from "react-hot-toast";
import { server, conf } from "../../config";
import PulseLoader from "react-spinners/PulseLoader";

const Task = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState("");

   const [currentStep, setCurrentStep] = useState(0);
const [move, setMove] = useState(true);
  const userRef = useRef();
  const errorRef = useRef();

  const navigate = useNavigate();
  const { token, projectData, setTaskdata } = useContext(TmsContext);

  useEffect(() => {
    setErrMsg("");
  }, [taskName, taskDescription]);

  const addTask = async (taskData) => {
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
const handlePrev = () => {
  setCurrentStep(currentStep - 1);
};

const handleNext = () => {
  if (move) {
    setCurrentStep(currentStep + 1);
  }
};
  const errClass = errMsg ? "mgs" : "offscreen";

  let content;

  if (isLoading) {
    content = (
      <div className="loding">
        <PulseLoader color="#333" />
      </div>
    );
  } else {
    content = (
      <div className="create-task">
        <p ref={errorRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <h2>Create tasks</h2>
        <p>
          Divide Your Project into tasks or assign the project to a member if it
          can be handled by just one person
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
        <div className="Btn Btns">
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    );
  }

  return content;
};

Task.prototype = {
  taskDescription: PropTypes.string,
  errMsg: PropTypes.string,
  errClass: PropTypes.string,
  response: PropTypes.object,
  name: PropTypes.string,
  taskName: PropTypes.string,
  projectData: PropTypes.object,
  token: PropTypes.string,
  taskData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default Task;
