import React from "react";
import "./Article3.css";
import Button from "../../atoms/button/Button";

function Article3() {
  return (
    <div className="artContainer">

      <div className="article3">

        <div className="leftArt3">
          <p className="firstPar"> Focus on what's important</p>
          <h2 className="Art3head">Reach that mental clarity you've been longing for.</h2>
          <p className="secondPar">
            Just focus on your assigned task and let the board do
            the organizing. Priotize your most important work.
          </p>
        </div>

        <div className="rightArt3">
          <p className="firstPar"> Improvise, Divide, and Conquer</p>
          <h2 className="Art3head">The fastest way to get tasks out of your head.</h2>
          <p className="secondPar">
            Tasktrec will be a life saver for you. It will help you be
            organized, on track, and stay at the top of your work{" "}
          </p>
        </div>
      </div>

      <div className="art3b">
        <div className="art3bhead">
          <h3>One app to replace them all</h3>
          <p>Your job in one: Goals, Tasks, Progress, Docs & more...</p>
        </div>

        <div>
          <Button />
        </div>

      </div>
    </div>
  );
}

export default Article3;
