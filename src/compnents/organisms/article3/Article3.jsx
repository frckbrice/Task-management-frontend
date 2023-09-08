import React from "react";
import "./Article3.css";

function Article3() {
  return (
    <div className="artContainer">
      <div className="article3">
        <div className="leftArt3">
          <p className="firstPar"> Focus on what's important</p>
          <h2>Reach that mental clarity you've been longing for.</h2>
          <p className="secondPar">
            You just have to focus on your assigned task and let the board do
            the organizing. Priotize your most important work.
          </p>
        </div>

        <div className="rightArt3">
          <p className="firstPar"> Improvise, Divide, and Conquer</p>
          <h2>The fastest way to get tasks out of yuor head.</h2>
          <p className="secondPar">
            Tasktrec will be a life saver for you. It will help you be
            organized, on track, and stay aontop the top of your work{" "}
          </p>
        </div>
      </div>

      <div className="art3b">
        <div>
          <h3>One app to replace them all</h3>
          <p>Your job in one: Goals, Tasks, Progress, Docs & more...</p>
        </div>

        <div>
          <button className="art3Btn">sign up it's free!</button>
        </div>

      </div>
    </div>
  );
}

export default Article3;
