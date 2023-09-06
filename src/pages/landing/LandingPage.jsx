import React from "react";
import "./LandingPage.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";
import RightNav from "../../compnents/molecules/rightNav/RightNav";

const LandingPage = () => {
  return (
    <>
        <NavBar>
          <RightNav />
        </NavBar>
    </>
  );
};

export default LandingPage;
