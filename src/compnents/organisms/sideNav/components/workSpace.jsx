import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";
import "../SideNav.css";

const WorkSpace = ({ projectList, selectProject, active }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="workspace-list" onClick={() => toggleDropdown()}>
      <div className="project-name">
        <span>Your Workspace</span>
        <MdKeyboardArrowDown />
      </div>

      {isOpen && (
        <div className="list-of-project">
          {projectList?.map((project, index) => (
            <div
              className={project === active ? "active" : "project-list"}
              key={index}
              onClick={() => selectProject(project)}
            >
              <p>{project.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkSpace;
