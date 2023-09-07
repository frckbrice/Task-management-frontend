import React from "react";
import "./LandingPage.css";
import NavBar from "../../compnents/organisms/navBar/NavBar";
import RightNav from "../../compnents/molecules/rightNav/RightNav";
import Header from "../../compnents/organisms/header/Header";
import Article1 from "../../compnents/organisms/article1/Article1";
import Article2 from "../../compnents/organisms/article2/Article2";

const LandingPage = () => {
  return (
    <>
      <NavBar>
        <RightNav />
      </NavBar>
      <Header />
      <Article1 />
      <Article2 />
    </>
  );
};

export default LandingPage;
