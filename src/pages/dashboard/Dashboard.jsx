import React, { useContext, useEffect, useState } from "react";
// css import
import "./Dashboard.css";

// libery imports
// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";
import avatar from "../../assets/avatar.jpg";

// components import
// import NavBar from "../../compnents/organisms/navBar/NavBar";
import NavIterms from "./nav_iterms/NavIterms";
// import { projectData } from "../../dummyData";
import SideNav from "../../compnents/organisms/sideNav/SideNav";
import ProjectDetialsBar from "../../compnents/organisms/projectDetialsBar/ProjectDetialsBar";
import PopupModal from "../../compnents/molecules/popupModal/PopupModal";

import TaskBoard from "../../compnents/organisms/taskBoard/TaskBoard";
import DashBoardNavBar from "../../compnents/organisms/dashBoardNavBar/DashBoardNavBar";

import { TmsContext } from "../../context/TaskBoardContext";
import OverLay from "../../compnents/atoms/overlay/OverLay";
import userAuth from "../../hooks/userAuth";
import { conf, server } from "../../config";
import { useStorage } from "../../hooks/useStorage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  const { token } = useStorage("token");

  const { profilePict, setProfilePict } = useContext(TmsContext);

  const { email, username, picture } = userAuth(token);
  if (picture) setProfilePict(picture);

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const {setStorToken} = useStorage('token',' ');
  const { setlsData } = useLocalStorage("refreshToken", " ");

  console.log("this is user data", { email, username, picture });

  // useEffect(() => {
  //   if (!user) {
  //     setUser({ email, username, picture });
  //   }

  //   localStorage.setItem("user", { email, username, picture });
  // }, [user]);

  // const user = dataValues;

  const logout = async () => {
    const resp = await server.post("/auth/logout", {
      headers: conf.headers,
    });

    if(resp && resp?.data?.accessToken) {
      setStorToken(resp?.data?.accessToken);
      setlsData(resp?.data?.refreshToken);
    }
  };

  const editProfile = async () => {
    const data = {};
    await server.patch("/members", data, {
      headers: conf.headers,
    });
  };

  console.log("user: ", user);
  return (
    <div className="dashboard">
      {openProfile && <OverLay action={toggleProfile} />}

      <DashBoardNavBar>
        <div className="navContent">
          <NavIterms
            profilePicture={profilePict || avatar}
            togleProfile={toggleProfile}
          ></NavIterms>
        </div>
      </DashBoardNavBar>
      {/* <NavBar className="dashNav"></NavBar> */}
      <div className="workSpace">
        <div className="sideNav-section">
          <SideNav />
        </div>
        <div className="main-section">
          <ProjectDetialsBar />
          <TaskBoard />
        </div>
      </div>
      {openProfile && (
        <div className="userProfile">
          <PopupModal onClick={toggleProfile}>
            <div className="profile">
              <img src={picture} alt="profile avatar" />
              <div className="profileDetai">
                <h4>{username}</h4>
                <p>{email}</p>
              </div>
              <div className="actions">
                <button className="logout" onClick={logout}>
                  logout
                </button>
                <button className="" onClick={editProfile}>
                  edit
                </button>
              </div>
            </div>
          </PopupModal>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
