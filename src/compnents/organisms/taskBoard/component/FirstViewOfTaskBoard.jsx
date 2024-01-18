import React, { useContext } from "react";
import "../TaskBoard.css";
import { TmsContext } from "../../../../context/TaskBoardContext";
import PopularModel from "./PopularModels";

const FirstViewOfTaskBoard = ({ projects }) => {
  const { setSelectedProject } = useContext(TmsContext);

  const taskboardProjects = projects?.map((project) => (
    <div
      key={project.id}
      className="taskboardproject"
      onClick={() => setSelectedProject(project)}
    >
      {project.name}
    </div>
  ));

  return (
    <div className="taskboard-list">
      <div style={{ marginLeft: 20 }}>
        <h3 style={{ color: "#f48207", marginBottom: 12, fontSize: 22 }}>
          Your Projects{" "}
        </h3>
        <div className="taskboard-grid">{taskboardProjects}</div>
      </div>
      <div>
        <PopularModel />
      </div>
    </div>
  );
};

export default FirstViewOfTaskBoard;
