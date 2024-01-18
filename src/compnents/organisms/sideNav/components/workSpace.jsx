import React, { useContext, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";
import "../SideNav.css";
import { TmsContext } from "../../../../context/TaskBoardContext";

const WorkSpace = ({ projectList, selectProject, active }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [projectName, setProjectName] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { selectedProject } = useContext(TmsContext);

  return (
    <div className="workspace-list" onClick={() => toggleDropdown()}>
      <div className="project-name">
        <span>Your Workspace</span>
        <MdKeyboardArrowDown />
      </div>
      <div className="projectselected">
        {selectedProject ? selectedProject?.name : "project name"}{" "}
      </div>

      {isOpen && (
        <div className="list-of-project">
          {projectList?.map((project, index) => (
            <div
              className={project === active ? "active" : "project-list"}
              key={index}
              onClick={() => selectProject(project)}
            >
              <p
                className=" workspacename"
                // onClick={() => setProjectName(project.name)}
              >
                {project.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkSpace;
