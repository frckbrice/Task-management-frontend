import React, { useState, memo, useEffect } from "react";

import "./TaskOpen.css";
// react icons
import { AiOutlineClose } from "react-icons/ai";

import { members } from "../../../dummyData";

// libery imports
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const TaskOpen = ({ onClick, taskName, description, editTask }) => {
  const [onEdit, setOnEdit] = useState(false);

  const handleOnEdit = () => {
    setOnEdit(!onEdit);
  };

  let editName, editDescription;
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    editName = data.taskName;
    editDescription = data.description;
    console.log("taskname: ", data.taskName);
    console.log("description", data.description);
  };

  useEffect(() => {
    editTask(editDescription, editName);
  }, [editDescription, editTask, editName]);

  return (
    <div className="taskOpen">
      <div className="head-text">
        <p>Task details...!</p>
        <button onClick={onClick}>{/* <AiOutlineClose /> */}</button>
      </div>
      {!onEdit && (
        <div className="content">
          <h3>{taskName}</h3>
          <p>{description}</p>
        </div>
      )}

      {onEdit && (
        <form className="content content-edit" onSubmit={handleSubmit}>
          <div className="content-edit-head">
            <input type="text" defaultValue={taskName} name="taskName" />
            <button>done</button>
          </div>

          <textarea
            name="description"
            id=""
            defaultValue={description}
          ></textarea>
        </form>
      )}
      <div className="actions">
        <div className="updateBtn">
          <button onClick={handleOnEdit}>{!onEdit ? "edit" : "back"}</button>
        </div>
        <button className="assign-task">delete</button>
      </div>
      <div className="task-member">
        {members.map((member, i) => (
          <Tippy
            key={i}
            content={<AsignMember name={member.name} />}
            interactive
            className="tippy"
            placement="top-start"
          >
            <div className="assiign-member" key={i}>
              <img
                src="https://i.pinimg.com/564x/13/6a/7d/136a7d742a5408847968c5db2149eba6.jpg"
                alt=""
              />
            </div>
          </Tippy>
        ))}
      </div>
    </div>
  );
};

const AsignMember = ({ name }) => {
  return (
    <div>
      <button>
        assign task to <span>{name}</span>
      </button>
    </div>
  );
};

export default memo(TaskOpen);
