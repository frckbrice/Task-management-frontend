import React from "react";
import "./Article2.css";
import Image from "../../../assets/Art2Img.png";

function Article2() {
  return (
      <div className="article2">
        <div className="art2ImgDiv">
          <img className="art2Img" src={Image} alt="Tracking todos" />
        </div>

        <div className="art2Text">
          <h4>Features</h4>
          <ul>
            <li>Create and Manage Project</li>
            <li>Create and Mange Tasks</li>
            <li>Invite Member(s)</li>
            <li>Assign Task to Member(s)</li>
            <li>Track Tasks Progress State</li>
            <li>Generate Project Report(s)</li>
          </ul>
        </div>
      </div>
  );
}

export default Article2;
