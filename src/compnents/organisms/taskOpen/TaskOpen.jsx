import React from "react";

import "./TaskOpen.css";

const TaskOpen = () => {
  return (
    <div className="taskOpen">
      <div className="head-text">
        <h3>Second task</h3>
        <h3>To do</h3>
      </div>
      <div className="content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aliquam
          iure, consectetur in eligendi tempora iusto ducimus incidunt
          accusantium voluptates.
        </p>
      </div>
      <div className="actions">
        <div className="deleteBtn">
          <button>Edit</button>
          <button>Delete</button>
        </div>

        <button>assign task</button>
      </div>
    </div>
  );
};

export default TaskOpen;
