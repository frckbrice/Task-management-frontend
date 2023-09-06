import React from "react";
// dummy data import
import { projectData, members, collaboProjects } from "../../../dummyData";

//css import
import "./SideNav.css";

// react icons imports
import { GoProjectSymlink } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";

// components import
import DashActionBtn from "../../atoms/dashActionBtn/DashActionBtn";

const SideNav = () => {
  return (
    <div className="sideNav">
      <div className="project">
        <div className="title">
          <GoProjectSymlink className="title-icon" />
          <h3>Projects</h3>
        </div>
        {projectData.map((project, index) => (
          <div className="list project-list" key={index}>
            <p>{project.name}</p>
            <BsThreeDotsVertical />
          </div>
        ))}
      </div>

      <div className="members">
        <div className="title">
          <MdPeopleOutline className="title-icon" />
          <h3>Members</h3>
        </div>
        {members.map((member, index) => (
          <div className="members-list" key={index}>
            <div className="member-profile">
              <img
                src="https://i.pinimg.com/564x/13/6a/7d/136a7d742a5408847968c5db2149eba6.jpg"
                alt="member's avatar"
                className="member-avatar"
              />
              <p>{member.name}</p>
            </div>
            <RiArrowDropDownLine />
          </div>
        ))}
      </div>

      <div className="collaborations">
        <div className="title">
          <GoProjectSymlink className="title-icon" />
          <h3>Collaborations</h3>
        </div>
        {collaboProjects.map((project, index) => (
          <div className="collaboProject-list" key={index}>
            <p>{project.name}</p>
            <BsThreeDotsVertical />
          </div>
        ))}
      </div>
      <DashActionBtn text="Add Project" className="addProjectBtn">
        <IoMdAddCircle className="action-icon" />
      </DashActionBtn>
    </div>
  );
};

export default SideNav;
