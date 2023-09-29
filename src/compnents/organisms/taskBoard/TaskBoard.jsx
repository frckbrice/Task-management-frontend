import React, { useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

// libery imports
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
// icon imports
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

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
import PulseLoader from "react-spinners/PulseLoader";

// project progress context import
import { ProgressContext } from "../../../context/ProgressContext";

const taskformBackend = [
  { id: uuid(), name: "1st task", description: faker.lorem.paragraph(2) },
  { id: uuid(), name: "2nd task", description: faker.lorem.paragraph(2) },
  { id: uuid(), name: "3rd task", description: faker.lorem.paragraph(2) },
  { id: uuid(), name: "4th task", description: faker.lorem.paragraph(2) },
  { id: uuid(), name: "5th task", description: faker.lorem.paragraph(2) },
];

const list = {
  // [uuid()]: {
  //   task_status: "Backlogs",
  //   tasks: [],
  // },
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
    let completed = false;

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

    if (destColumn?.task_status === "Completed") completed = true;

    const data = {
      sourceStatusId: source.droppableId,
      destStatusId: destination.droppableId,
      taskid: removed.id,
      completed,
    };

    //update the status of the task in the backend
    serverInterceptor
      .post("/tasks/updatOnDrag&Drop", data, {
        headers: {
          "Access-Control-Allow-Credentials": true,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response && response.data.newTaskStatus) {
          toast.success("task status successfully updated");
          console.log(
            "task status successfully updated",
            response.data.newTaskStatus
          );
        }
      })
      .catch((err) => console.log("Error updating task status", err));
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
  const [isLoading, setIsLoading] = useState(false);

  const { selectedProject } = useContext(TmsContext);

  const { setProgress } = useContext(ProgressContext);

  const { token } = useStorage("token");

  const [disabled, setDisabled] = useState(false);

  // console.log("token", token);
  // console.log("project data", selectedProject);

  useEffect(() => {
    setDisabled(false);
    setErrMsg("");
  }, []);

  useEffect(() => {
    const fetchProjects = () => {
      setIsLoading(true);
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
          if (response && response.data.formatedStatuses) {
            console.log(
              "\n \n all project status:",
              new Set(response.data.formatedStatuses)
            );
            setIsLoading(false);
            const columnsStatus = response?.data?.formatedStatuses
              ?.reverse()
              .reduce((obj, status) => {
                const key = Object.keys(status)[0];
                obj[key] = status[key];
                return obj;
              }, {});
            setColumns(columnsStatus);
          }
        })
        .catch((err) => {
          console.log("Error getting project status", err);
          setIsLoading(false);
        });
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
      setIsLoading(true);
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
          if (response && response.data.task) {
            toast.success("task successfully created");
            console.log("task created", response?.data?.task);

            setIsLoading(false);

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
            setIsLoading(false);
          }
        } catch (err) {
          toast.error("Failed to create a task.");
          setIsLoading(false);
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
    setIsLoading(true);
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
        if (response && response.data && response.data.status) {
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
          setIsLoading(false);
        }
      } catch (err) {
        toast.error("Failed to create a task.");
        setIsLoading(false);
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
      setIsLoading(true);
      const data = {
        id: editTask.id,
        name: editName,
        description: editDescription,
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
          if (response && response.data.updatedTask) {
            toast.success("task successfully updated");
            console.log("task updated", response?.data?.updatedTask);
            setRendered(true);
            setIsLoading(false);

            setTaskDescription("");
            setTaskName("");
          }
        } catch (err) {
          toast.error("Failed to create a task.");
          setIsLoading(false);
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

  // handle list movement/ change list position
  // handel move task forward
  const handleMoveNext = (id) => {
    console.clear();
    const columnKeys = Object.keys(columns);

    const originalIndex = columnKeys.findIndex((item) => item === id);
    const nextIndex = originalIndex + 1;

    if (nextIndex > columnKeys.length - 1) return;

    const tempVal = columnKeys[originalIndex];

    columnKeys[originalIndex] = columnKeys[nextIndex];

    columnKeys[nextIndex] = tempVal;

    const result = columnKeys.reduce((acc, current) => {
      return {
        ...acc,
        [current]: columns[current],
      };
    }, {});
    setColumns(result);
    // console.log("columns: ", columns);

    // console.log("result: ", result);
  };

  // hande move task previous
  const handelMovePrev = (id) => {
    const columnKeys = Object.keys(columns);
    const originalIndex = columnKeys.findIndex((item) => item === id);
    const nextIndex = originalIndex - 1;

    if (nextIndex < 0) return;

    const tempVal = columnKeys[originalIndex];

    columnKeys[originalIndex] = columnKeys[nextIndex];

    columnKeys[nextIndex] = tempVal;

    const result = columnKeys.reduce((acc, current) => {
      return {
        ...acc,
        [current]: columns[current],
      };
    }, {});
    setColumns(result);
  };

  const handleChange = (e) => {
    setListName(e.target.value);
    setErrMsg("");
  };
  // handle task completed count
  const completedPecentage = () => {
    let totalTask = 0;
    const columnValue = Object.values(columns);
    // console.log("columnValue", columnValue);
    columnValue?.forEach((column) => {
      totalTask += column["tasks"]?.length;
      return totalTask;
    });
    const completedTask = columnValue.find(
      (column) => column["task_status"] === "Completed"
    );

    const percentage = (completedTask["tasks"]?.length / totalTask) * 100;
    // update progress bar
    setProgress(percentage);
    console.clear();
    // console.log("totalTask: ", totalTask);
    // console.log("completed: ", completedTask["tasks"].length);
    // console.log("percentage: ", percentage);
  };

  //  completedPecentage();
  // handle delete column
  const handleDeleteColumn = (id) => {
    const columnKeys = Object.keys(columns);
    const updatedColumns = columnKeys.filter((column) => column !== id);

    const result = updatedColumns.reduce((acc, current) => {
      return {
        ...acc,
        [current]: columns[current],
      };
    }, {});
    setColumns(result);
    console.clear();
    // console.log("updatedColumns", result);
    // console.log("columns", columns);
  };

  const loader = <PulseLoader color="#0707a0" size={15} />;

  const content = (
    <>
      {showAddTask && <OverLay action={togglePopup} />}
      {openTask && <OverLay action={handleOpentask} />}
      <div className="task-board">
        {showAddTask && (
          <div className="add-task">
            <PopupModal onClick={togglePopup} title={`Add new task `}>
              {isLoading && <PulseLoader color="#0707a0" size={15} />}

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
                  <div className="list-options">
                    <h3>{column.task_status}</h3>
                    <div className="list-action">
                      <Tippy content="delete list" className="tippy-button">
                        <button onClick={() => handleDeleteColumn(id)}>
                          <span className="delete-list">
                            <AiOutlineDelete />
                          </span>
                        </button>
                      </Tippy>
                      <Tippy content="move left" className="tippy-button">
                        <button onClick={() => handelMovePrev(id)}>
                          <span>
                            <GrFormPrevious />
                          </span>
                        </button>
                      </Tippy>
                      <Tippy content="move right" className="tippy-button">
                        <button onClick={() => handleMoveNext(id)}>
                          <span>
                            <MdNavigateNext />
                          </span>
                        </button>
                      </Tippy>
                    </div>
                  </div>

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
            isLoading={isLoading}
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
              {isLoading && <PulseLoader color="#0707a0" size={15} />}
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
                  onChange={handleChange}
                />
                <button onClick={addNewTaskList}>Add List</button>
              </div>
            </PopupModal>{" "}
          </div>
        )}
      </div>
    </>
  );
  return <>{isLoading ? loader : content}</>;
};

export default TaskBoard;
