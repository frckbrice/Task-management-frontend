import React from "react";

import "./TaskOpen.css";
// react icons
// import { AiOutlineClose } from "react-icons/ai";
// import { FiEdit } from "react-icons/fi";
// import { AiOutlineDelete } from "react-icons/ai";

import { members } from "../../../dummyData";

// libery imports
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const TaskOpen = ({ onClick }) => {
  return (
    <div className="taskOpen">
      <div className="head-text">
        <h3>To do</h3>
        <button onClick={onClick}>
          {/* <AiOutlineClose /> */}
        </button>
      </div>
      <div className="content">
        <h3>Second task</h3>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aliquam
          iure, consectetur in eligendi tempora iusto ducimus incidunt
          accusantium voluptates.
        </p>
      </div>
      <div className="actions">
        <div className="updateBtn">
          <button>
            <span>
              {/* <FiEdit /> */}
            </span>
          </button>
        </div>

        <button className="assign-task">delete</button>
      </div>
      <div className="task-member">
        {members.map((member, i) => (
          <Tippy
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

export default TaskOpen;
