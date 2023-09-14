import React from "react";
import "./LandingPage.css";

import NavBar from "../../compnents/organisms/navBar/NavBar";
import RightNav from "../../compnents/molecules/rightNav/RightNav";
import Header from "../../compnents/organisms/header/Header";
import Article1 from "../../compnents/organisms/article1/Article1";
import Article2 from "../../compnents/organisms/article2/Article2";
import Article3 from "../../compnents/organisms/article3/Article3";
import Footer from "../../compnents/organisms/footer/Footer";

const LandingPage = () => {
  return (
    <>
    <div className="landingPage">
      <NavBar>
        <RightNav />
      </NavBar>
      <Header />
      <Article1 />
      <Article2 />
      <Article3 />
      <Footer />
      </div>
    </>
  );
};

export default LandingPage;
