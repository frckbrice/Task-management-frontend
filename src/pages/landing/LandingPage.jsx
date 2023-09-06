import React from "react";
import "./LandingPage.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";
import RightNav from "../../compnents/molecules/rightNav/RightNav";
import Header from "../../compnents/organisms/header/Header";

const LandingPage = () => {
  return (
    <>
      <NavBar>
        <RightNav />
      </NavBar>
      <Header />
    </>
  );
};

export default LandingPage;
