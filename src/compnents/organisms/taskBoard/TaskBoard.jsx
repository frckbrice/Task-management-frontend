import React, { useState } from "react";
import { v4 as uuid } from "uuid";

// libery imports
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./TaskBoard.css";

const taskformBackend = [
  { id: uuid(), content: "first task" },
  { id: uuid(), content: "second task" },
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

  return (
    <div className="task-board">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div className="columns">
              <div className="list-hearder">
                <h3>{column.task_status}</h3>
                <button>Add Task</button>
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
                            : "lightgray",
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
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {task.content}
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
      <button className="add-list">add list</button>
    </div>
  );
};

export default TaskBoard;
