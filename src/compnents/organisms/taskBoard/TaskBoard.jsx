import React, { useState } from "react";
import { v4 as uuid } from "uuid";

// libery imports
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./TaskBoard.css";
import { faker } from "@faker-js/faker";
import PopupModal from "../../molecules/popupModal/PopupModal";
import PopupForm from "../popupForm/PopupForm";
import TaskOpen from "../taskOpen/TaskOpen";

const taskformBackend = [
  { id: uuid(), name: "first task", description: faker.lorem.paragraph(2) },
  { id: uuid(), name: "second task", description: faker.lorem.paragraph(2) },
];

const list = {
  [uuid()]: {
    task_status: "Backlogs",
    tasks: taskformBackend,
  },
  [uuid()]: {
    task_status: "To do",
    tasks: [],
  },
  [uuid()]: {
    task_status: "In Progress",
    tasks: [],
  },
  [uuid()]: {
    task_status: "Ready for Review",
    tasks: [],
  },
  [uuid()]: {
    task_status: "Completed",
    tasks: [],
  },
};

// handle drag and drop changes
const onDragEnd = (result, columns, setColumns) => {
  console.log("results: ", result);
  console.log("results dropableId: ", result.draggableId);
  console.log("source dropableId: ", result.source.droppableId);

  // if (result.droppableId === undefined) return;
  // console.log("this is dropableId: ", result.draggableId);

  // if (result.source[0].droggableId === result.description.droppableId) return;
  if (!result.destination) return;
  const { source, destination } = result;

  // check source and destination deffrences
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];

    const [removed] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destTasks,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedTasks = [...column.tasks];

    // splice and remove iterm from the array
    const [removed] = copiedTasks.splice(source.index, 1);
    copiedTasks.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        column,
        tasks: copiedTasks,
      },
    });
  }
  console.log("this is column: ", columns);
};

const TaskBoard = () => {
  const [columns, setColumns] = useState(list);
  const [showAddTask, setShowAddTask] = useState(false);
  const [currentStatus, setCurrentTaskStatus] = useState("");
  const [openTask, setOpenTask] = useState(false);

  const togglePopup = (status = "") => {
    setCurrentTaskStatus(status);
    setShowAddTask((prev) => !prev);
  };

  return (
    <div className="task-board">
      {showAddTask && (
        <div className="add-task">
          <PopupModal
            onClick={togglePopup}
            title={`Add new ${currentStatus} task `}
          >
            <PopupForm
              inputText="Enter task name"
              textarea="Add task description..."
              buttonText="Add Task"
            />
          </PopupModal>
        </div>
      )}
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div className="columns" key={id}>
              <div className="list-hearder">
                <h3>{column.task_status}</h3>
                <button
                  className="add-list-btn"
                  onClick={() => togglePopup(column.task_status)}
                >
                  Add Task
                </button>
              </div>

              <div className="droppable">
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "transparent",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.tasks.map((task, index) => {
                          return (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => setOpenTask((prev) => !prev)}
                                    className="card"
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "white",

                                      // border: "1px solid #d9d9dd",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <div className="task-card">
                                      <h3>{task.name}</h3>
                                      <p>{task.description}</p>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
      {openTask && <TaskOpen onClick={() => setOpenTask((prev) => !prev)} />}
    </div>
  );
};

export default TaskBoard;
