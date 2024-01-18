import React from "react";
import "../TaskBoard.css";

const projectModels = [
  ["Project management", "https://trello.com/b/cZSIrEWs/conduite-de-projet"],
  [
    "Team dashbord",
    " https://trello.com/b/1gjKRaKm/tableau-de-bord-d%C3%A9quipe",
  ],
  ["Kanban model", "https://trello.com/b/YAgZ49uf/mod%C3%A8le-kanban"],
];

const PopularModel = () => {
  const taskboardProjects = projectModels?.map((project) => (
    <div key={project} className=" models">
      <button className="projectmodel">
        <a href={project[1]} className="projectmodellink">
          Trello model
        </a>
      </button>
      <span> {project[0]}</span>
    </div>
  ));

  return (
    <div className="taskboard-list">
      <div>
        <h2 style={{ color: "#f48207", marginBottom: 12, fontSize: 22 }}>
          Popular Models.{" "}
        </h2>
        <div className="taskboard-grid">{taskboardProjects}</div>
      </div>
    </div>
  );
};

export default PopularModel;
