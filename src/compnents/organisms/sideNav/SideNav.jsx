import React, { useContext, useEffect, useMemo, useState } from "react";

import useDebounce from "../../../hooks/useDebounce";

import avatar from "../../../assets/avatar.jpg";

// libery imports
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

//css import
import "./SideNav.css";

// react icons imports
import { GoProjectSymlink } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
// import { IoMdAddCircle } from "react-icons/io";

// components import
import DashActionBtn from "../../atoms/dashActionBtn/DashActionBtn";
import PopupModal from "../../molecules/popupModal/PopupModal";
// import PopupForm from "../popupForm/PopupForm";
import OverLay from "../../atoms/overlay/OverLay";
import { TmsContext } from "../../../context/TaskBoardContext";

import useServerInterceptor from "../../../hooks/useServerInterceptor";
import toast from "react-hot-toast";

import MemberProfile from "../membersProfile/MemberProfile";
import { useStorage } from "../../../hooks/useStorage";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { members } from "../../../dummyData";
import PulseLoader from "react-spinners/PulseLoader";

const SideNav = () => {
  // create ref
  const ref = React.createRef;
  const serverInterceptor = useServerInterceptor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [projectdescription, setProjectDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [newdata, setNewdata] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { lsData, setlsData } = useLocalStorage("collaborations");

  const {
    setProjectData,
    setSelectedProject,
    setMembersofProject,
    isLoad,
    setIsLoad,
  } = useContext(TmsContext);
  const { token } = useStorage("token");

  // console.log({ token, setProjectData });

  // console.log("collaborations", collaborations);
  useEffect(() => {
    setDisabled(false);
  }, [isLoad]);

  useEffect(() => {
    const fetchProjects = () => {
      serverInterceptor
        .get("/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Credentials": true,
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response && response.data && response.status === (200 || 201)) {
            console.log("\n \n all projects:", response.data);
            setProjectList(response.data);
          }
        })
        .catch((err) => console.log("Error getting projects", err));
    };

    fetchProjects();
  }, [newdata, serverInterceptor, token]);

  useEffect(() => {
    serverInterceptor
      .get("/projects/collaborations", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": true,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response && response.data && response.data.length) {
          console.log("\n \n all collaborations:", response.data);
          setlsData(response.data);
          setCollaborations(lsData);
        }
      })
      .catch((err) => console.log("Error getting projects", err));
  }, [token, serverInterceptor,lsData, setlsData]);

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
    // alert("working");
  };

  const createProject = async (e) => {
    setDisabled(true);
    setIsLoading(true);
    e.preventDefault();
    let data = {
      name: projectName,
      description: projectdescription,
      startDate,
      estimateEndDate: endDate,
      teamName,
    };

    if (token) {
      try {
        const response = await serverInterceptor.post("/projects", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Credentials": true,
            Accept: "application/json",
          },
        });
        console.log(response);
        if (response && response.status === 201) {
          toast.success("project successfully created");
          setProjectData(response.data.data);
          setProjectList((prev) => [...prev, response.data.data]);
          setNewdata(true);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error("Failed to create project.");
        console.log(error);
        setIsLoading(false);
      }
    } else {
      console.log("no token, cannot proceed");
      toast.error("Login before creating project");
      setIsLoading(false);
    }
  };

  // const debouncedClick = useDebounce(createProject, 500);

  console.log({ projectMembers });
  //*selecct projct and get members
  const selectProject = (project) => {
    //send select project to context for sharing
    setSelectedProject(project);
    setIsLoad(true);
   setIsLoading(true);
    let data = { id: project.id };
    serverInterceptor
      .post("projects/members", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": true,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response && response.data) {
          console.log("\n \n all project members:", response.data);
          setProjectMembers(response.data.projectMembers);
          setMembersofProject(response.data.projectMembers);
        }
      })
      .catch((err) => console.log("Error getting project Members", err));
  };

  return (
    <>
      {isModalOpen && <OverLay action={handleClick} />}

      <div className="sideNav">
        <div className="project">
          <div className="title">
            <GoProjectSymlink className="title-icon" />
            <h3>Projects</h3>
          </div>
          <DashActionBtn
            text="Add Project"
            className="addProjectBtn"
            onClick={handleClick}
          >
            {/* <IoMdAddCircle className="action-icon" /> */}
          </DashActionBtn>

          {isModalOpen && (
            <div className="add-project-popup" ref={ref}>
              {isLoading && <PulseLoader color="#0707a0" size={15} />}
              <PopupModal title="Add new project" onClick={handleClick}>
                <form className="addProjectForm" onSubmit={createProject}>
                  <p>Project Name</p>
                  <input
                    type="text"
                    placeholder="enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  <p>Starting date</p>
                  <input
                    type="date"
                    id="start_date"
                    name="start date"
                    value={startDate}
                    className="date-input"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <p>Estimate Ending date</p>
                  <input
                    type="date"
                    id="start_date"
                    name="start date"
                    className="date-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  {/* <label>Description</label> */}
                  <textarea
                    id="projectdesc"
                    className="addTextArea"
                    placeholder="add description"
                    name="projectdesc"
                    // rows={60}
                    // culomn
                    value={projectdescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    cols={30}
                  />
                  <p>team name</p>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    className="date-input"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />{" "}
                  {/* <label>Description</label> */}
                  <button disabled={disabled}>Add Project</button>
                </form>
              </PopupModal>
            </div>
          )}

          {projectList?.map((project, index) => (
            <div
              className="list project-list"
              key={index}
              onClick={() => selectProject(project)}
            >
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
          {projectMembers?.map((member, index) => (
            <div className="members-list" key={index}>
              <div className="member-profile">
                <img
                  src={member.picture || avatar}
                  alt=""
                  className="member-avatar"
                />
                <p>{member.username}</p>
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
          {collaborations?.map((project, index) => (
            <div className="collaboProject-list" key={index}>
              <p>{project.name}</p>
              <BsThreeDotsVertical />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideNav;
