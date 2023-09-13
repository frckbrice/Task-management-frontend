import React, { useState } from "react";
import "./OnBoarding.css";

function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleSkip = () => {
    // navigate to dashboard
  };

  const handleOk = () => {
    // navigate to dashboard
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="onBoarding">
      {currentStep === 0 && (
        <div className="welcome-card">
          <h1>welcome! "daisy"</h1>
          <p>
            We are delighted to have you on board. We built <span>TaskTrec</span> to help you
            or you and your team stay organised and to automate work.
          </p>
          <h4>Let's guide you to get started</h4>
          <div className="Btn Btns">
            <button onClick={handleSkip}>Skip</button>
            <button onClick={handleNext}>Get Started</button>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="create-project">
          <h2>Create your first project</h2>
          <p>
            Input the name of your project and describe the purpose of that
            project.
          </p>
          <card className="projectCard">
            <label>Name</label>
            <input type="text" id="projectname" />
            <br />
            <div className="projectField">
              <label>Description</label>
              <input type="text" id="projectdesc" className="forminput" />
            </div>
          </card>
          <div className="projectBtns Btns">
            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="create-task">
          <h2>Create tasks</h2>
          <p>
            Divide Your Project into tasks or assign the project to a member if
            it can be handled by just one person
          </p>
          <h4>Backlogs</h4>
          <input type="text" id="taskinput" className="forminput" />
          <button className="addtaskBtn">Add Task</button>
          <div className="Btn Btns">
            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="invitation">
          <h2>Invitation</h2>
          <p>Invite your team members, share task and get started</p>
          <p>Search example @name...</p>
          <card className="cardForm">
            <input type="name" id="invitemember" placeholder="search" />
            <button className="inviteBtn">Invite Member(s)</button>
          </card>
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
          <p>
            Explore more fields on your workspace like Project progress,
            sharing, and generating reports.
          </p>
          <div className="Btn Btns">
            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleOk}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OnBoarding;
