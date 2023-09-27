import React, { useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

// libery imports
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./TaskBoard.css";
import { faker } from "@faker-js/faker";
import PopupModal from "../../molecules/popupModal/PopupModal";
import PopupForm from "../popupForm/PopupForm";
import TaskOpen from "../taskOpen/TaskOpen";
import OverLay from "../../atoms/overlay/OverLay";
import toast from "react-hot-toast";
import { serverInterceptor } from "../../../config";
import { useStorage } from "../../../hooks/useStorage";
import { TmsContext } from "../../../context/TaskBoardContext";

const taskformBackend = [
  { id: uuid(), name: "first task", description: faker.lorem.paragraph(2) },
  { id: uuid(), name: "second task", description: faker.lorem.paragraph(2) },
];

const list = {
  [uuid()]: {
    task_status: "Backlogs",
    tasks: [],
  },
  [uuid()]: {
    task_status: "To do",
    tasks: [],
  },
  [uuid()]: {
    task_status: "In Progress",
    tasks: [],
  },
  // [uuid()]: {
  //   task_status: "Ready for Review",
  //   tasks: [],
  // },
  // [uuid()]: {
  //   task_status: "Completed",
  //   tasks: [],
  // },
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
  const [taskList, setTaskList] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [currentStatusId, setCurrentTaskStatusId] = useState("");
  const [openTask, setOpenTask] = useState(false);
  const [taskcompleted, setTaskcompleted] = useState(false);
  const [openAddList, setOpenAddList] = useState(false);
  const [editTask, setEditTask] = useState({});
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [listName, setListName] = useState("");
  const [rendered, setRendered] = useState(false);

  const { selectedProject } = useContext(TmsContext);

  const { token } = useStorage("token");

  const [disabled, setDisabled] = useState(false);

  // console.log("token", token);
  // console.log("project data", selectedProject);

  useEffect(() => {
    setDisabled(false);
    setErrMsg("");
  }, [rendered]);

  useEffect(() => {
    const fetchProjects = () => {
      let data = { id: selectedProject?.id };
      serverInterceptor
        .post("projectStatus/ofproject", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Credentials": true,
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response && response.data) {
            console.log(
              "\n \n all project status:",
              new Set(response.data.formatedStatuses)
            );
            const columnsStatus = response?.data?.formatedStatuses?.reverse().reduce(
              (obj, status) => {
                const key = Object.keys(status)[0];
                obj[key] = status[key];
                return obj;
              },
              {}
            );
            setColumns(columnsStatus);
          }
        })
        .catch((err) => console.log("Error getting project status", err));
    };

    fetchProjects();
  }, [selectedProject?.id, token]);

  const togglePopup = (id) => {
    setCurrentTaskStatusId(id);
    setShowAddTask((prev) => !prev);
  };

  const handleOpentask = (task) => {
    setEditTask(task);
    setOpenTask(!openTask);
  };

  const onchangeName = useCallback((e) => {
    setTaskName(e.target.value);
  }, []);

  const onchangeDescription = useCallback((e) => {
    setTaskDescription(e.target.value);
  }, []);

  const addTask = useCallback(
    async (e) => {
      e.preventDefault();

      const data = {
        name: taskName,
        description: taskDescription,
        projectStatusId: currentStatusId,
      };
      if (token) {
        try {
          const response = await serverInterceptor.post("/tasks", data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Credentials": true,
              Accept: "application/json",
            },
          });
          if (response && response.data) {
            toast.success("task successfully created");
            console.log("task created", response?.data?.task);
           
            const column = columns[currentStatusId];
            setColumns({
              ...columns,
              [currentStatusId]: {
                ...column,

                tasks: [...column.tasks, response?.data?.task],
              },
            });
             setTaskList([...column.tasks, response?.data?.task]);
            setTaskDescription("");
            setTaskName("");
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
          } else if (err.status === 409) {
            setErrMsg("Duplicates");
          } else {
            setErrMsg(err.data?.message);
            console.error(err.data?.message);
          }
        }
      } else {
        console.log("no token, can not proceed");
        toast.error("Failed to create a task.");
        setErrMsg("Need to log in first");
      }
    },
    [taskDescription, token, taskName, currentStatusId, columns]
  );

  const addNewTaskList = async () => {
    const data = {
      projectId: selectedProject?.id,
      designation: listName,
    };
    if (token) {
      try {
        const response = await serverInterceptor.post("/projectStatus", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Credentials": true,
            Accept: "application/json",
          },
        });
        console.log("project status", response.data);
        if (response && response.data) {
          toast.success("new column successfully created");
          console.log("project status", response.data);
          setColumns({
            ...columns,
            [response.data.status.id]: {
              task_status: listName,
              tasks: [],
            },
          });

          setListName("");
        }
      } catch (err) {
        toast.error("Failed to create a task.");

        console.log(err);
        if (!err.status) {
          setErrMsg("No Server Response");
        } else if (err.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.status === 401) {
          setErrMsg("Unauthorized");
        } else if (err.status === 403) {
          setErrMsg("Forbidden");
        } else if (err.status === 409) {
          setErrMsg("Already exist");
        } else {
          setErrMsg(err.data?.message);
          console.error(err.data?.message);
        }
      }
    } else {
      console.log("no token, can not proceed");
      setErrMsg("Need to log in first");
      toast.error("Failed to create a task.");
    }
  };

  // to get the last column. we suppose the last column is the ending task process
  // const values = Object.values(columns);
  // const lastColumn = values.pop();

  // console.log('column', columns)

  const updateTask = useCallback(
    async (editDescription, editName) => {
      // console.log("currentStatusId", currentStatusId);
      // if (columns[currentStatusId]?.task_status === lastColumn.task_status) {
      //   setTaskcompleted(true);
      // }

      const data = {
        id: editTask.id,
        name: editName,
        description: editDescription,
        // projectStatusId: currentStatusId,
        completed: taskcompleted,
      };
      if (token) {
        try {
          const response = await serverInterceptor.patch("/tasks", data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Credentials": true,
              Accept: "application/json",
            },
          });
          if (response && response.data) {
            toast.success("task successfully updated");
            console.log("task updated", response?.data?.updatedTask);
            setRendered(true);
          
            // setColumns();

            setTaskDescription("");
            setTaskName("");
          }
        } catch (err) {
          toast.error("Failed to create a task.");

          console.log(err);
          if (!err.status) {
            setErrMsg("No Server Response");
          } else if (err.status === 400) {
            setErrMsg("Missing Username or Password");
          } else if (err.status === 401) {
            setErrMsg("Unauthorized");
          } else if (err.status === 403) {
            setErrMsg("Forbidden");
          } else if (err.status === 409) {
            setErrMsg("Duplicates");
          } else {
            setErrMsg(err.data?.message);
            console.error(err.data?.message);
          }
        }
      } else {
        console.log("no token, can not proceed");
        toast.error("Failed to create a task.");
        setErrMsg("Need to log in first");
      }
      setErrMsg("");
    },
    [token, editTask.id, taskcompleted]
  );

  const errClass = errMsg ? "mgs" : "offscreen";

  return (
    <>
      {showAddTask && <OverLay action={togglePopup} />}
      {openTask && <OverLay action={handleOpentask} />}
      <div className="task-board">
        {showAddTask && (
          <div className="add-task">
            <PopupModal onClick={togglePopup} title={`Add new task `}>
              <PopupForm
                inputText="Enter task name"
                value={taskName}
                onchangeName={onchangeName}
                id="taskName"
                description={taskDescription}
                idDescription="taskDescription"
                textarea="Add task description..."
                buttonText="Add Task"
                onchangeDescription={onchangeDescription}
                onSubmit={addTask}
                disabled={disabled}
                errClass={errClass}
                errMsg={errMsg}
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
                    onClick={() => togglePopup(id)}
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
                                      onClick={() => {
                                        handleOpentask(task);
                                      }}
                                      className="card"
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#fff",
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
        {openTask && (
          <TaskOpen
            taskName={editTask.name}
            description={editTask.description}
            onClick={handleOpentask}
            editTask={updateTask}
            task={editTask}
          />
        )}
        <button
          className="add-list"
          onClick={() => setOpenAddList(!openAddList)}
        >
          add list
        </button>
        {openAddList && <OverLay action={() => setOpenAddList(!openAddList)} />}

        {openAddList && (
          <div className="addListForm">
            {" "}
            <PopupModal onClick={() => setOpenAddList(!openAddList)}>
              <div className="addForm">
                <p className={errClass} aria-live="assertive">
                  {errMsg}
                </p>
                <h4>Add new Task status list</h4>
                {/* <PopupForm /> */}
                <input
                  type="text"
                  placeholder="Enter List name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
                <button onClick={addNewTaskList}>Add List</button>
              </div>
            </PopupModal>{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskBoard;
