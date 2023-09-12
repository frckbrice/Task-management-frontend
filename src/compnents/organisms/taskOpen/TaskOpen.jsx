import React from "react";

import "./TaskOpen.css";
// react icons
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const TaskOpen = ({ onClick }) => {
  return (
    <div className="taskOpen">
      <div className="head-text">
        <h3>To do</h3>
        <button onClick={onClick}>
          <AiOutlineClose />
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
              <FiEdit />
            </span>
          </button>
          <button>
            <span>
              <AiOutlineDelete />
            </span>
          </button>
        </div>

        <button className="assign-task">assign task</button>
      </div>
    </div>
  );
};

export default TaskOpen;
