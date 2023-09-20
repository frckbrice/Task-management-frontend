import React from "react";
import "./Page404.css";
import Img404 from "../../assets/404pic.png";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="page404">
      <div className="text404">
        <p>Page not found!</p>
      </div>
      <div className="img404">
        <img src={Img404} alt="404Page" />
      </div>
      <div className="link404">
        <Link to={-1}> Go Back</Link>
        <Link to="/"> Go Home</Link>
      </div>
    </div>
  );
}

export default Page404;
