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
        <img src={Img404} alt="404Page" className="Img404"/>
      </div>
      <div className="link404">
        <Link to={-1} className="goback"> Go Back</Link>
        <Link to="/" className="gohome"> Go Home</Link>
      </div>
    </div>
  );
}

export default Page404;
