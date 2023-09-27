import React, { useState, memo, useEffect, useContext } from "react";

import "./TaskOpen.css";
// react icons
import { AiOutlineClose } from "react-icons/ai";

import avatar from "../../../assets/avatar.jpg";
// libery imports
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { TmsContext } from "../../../context/TaskBoardContext";
import { useStorage } from "../../../hooks/useStorage";
import { serverInterceptor } from "../../../config";
import toast from "react-hot-toast";

const TaskOpen = ({ onClick, taskName, description, editTask, task }) => {
  const [onEdit, setOnEdit] = useState(false);

 const { token } = useStorage("token");
  const handleOnEdit = () => {
    setOnEdit(!onEdit);
  };

  const { memberofProject } = useContext(TmsContext);

  console.log("memberofProject", memberofProject);

  let editName, editDescription;
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    editName = data.taskName;
    editDescription = data.description;
    // console.log("taskname: ", data.taskName);
    // console.log("description", data.description);
    editTask(editDescription, editName);
  };  
  
  
  const id = task.id;
 console.log("id: ", id);


  const deleteTask = async() => {
    const data = {
      id,
    }

  
     if (token) {
       try {
         const response = await serverInterceptor.delete("/tasks", {
           headers: {
             Authorization: `Bearer ${token}`,
             "Access-Control-Allow-Credentials": true,
             Accept: "application/json",
           },
           data,
         });

         if (response && response.data && response.data.assigment) {
           toast.success("task successfully deleted ");
           console.log("task updated", response?.data?.message);
         }
       } catch (error) {
        console.log('Error deleting task: ' + error.message); 
         toast.error('Error deleting the task');
       }
    }
  };

  return (
    <div className="taskOpen">
      <div className="head-text">
        <h4>Task details...!</h4>
        <button onClick={onClick}> <AiOutlineClose style={{color: 'red'}}/> </button>
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
        <button className="assign-task" onClick={deleteTask}>delete</button>
      </div>
      <div className="task-member">
        {memberofProject?.map((member, index) => (
          <Tippy
            key={index}
            content={<AsignMember name={member.username} task={task} />}
            interactive
            className="tippy"
            placement="top-start"
          >
            <div className="assiign-member" key={index}>
              <img
                src={member.picture || avatar}
                alt=""
                // className="member-avatar"
              />
            </div>
          </Tippy>
        ))}
      </div>
    </div>
  );
};

const AsignMember = ({ name, task }) => {
  const { token } = useStorage("token");

  const assignTaskTo = async() => {
    const data = {
      username: name,
      taskId: task.id,
    };
    if (token) {
      const response = await serverInterceptor.post(
        "tasks/assignToMember",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Credentials": true,
            Accept: "application/json",
          },
        }
      );

       if (response && response.data && response.data.assigment) {
         toast.success("task successfully assigned ");
         console.log("task updated", response?.data?.assigment);
       }
    }
  };

  return (
    <div>
      <button onClick={assignTaskTo}>
        assign task to <span>{name}</span>
      </button>
    </div>
  );
};

export default memo(TaskOpen);
