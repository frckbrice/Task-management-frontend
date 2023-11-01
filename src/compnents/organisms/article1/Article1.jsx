import React from "react";
import "./Article1.css";
import Image from "../../../assets/art1Img.png";

function Article1() {
  return (
    <div className="article1">
      <table className="art1Table">
        <th className="tab1">Docs</th>
        <th>Whiteboards</th>
        <th>Dashboards</th>
      </table>

      <div className="head2">
        <h2>The World's Most Powerful(fun) Web Application.</h2>
      </div>

      <div>
        <img className="img2" src={Image} alt="Workspace" />
      </div>
    </div>
  );
}

export default Article1;
