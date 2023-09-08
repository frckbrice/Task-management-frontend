import React, { Component } from "react";
import "./RightNav.css";
import "font-awesome/css/font-awesome.min.css";

class RightNav extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <div className="rightNav">
        <div
          id="righttxtbtn"
          className={
            this.state.clicked ? "#righttxtbtn active" : "#righttxtbtn"
          }
        >
          <div className="righttxt">
            <ul>
              <li>
                <a href="index">Features</a>
              </li>
              <li>
                <a href="index">For Teams</a>
              </li>
              <li>
                <a href="index">Get Help</a>
              </li>
            </ul>
          </div>

          <div className="btn">
            <button className="reg">Sign Up</button>
            <button className="log">Log In</button>
          </div>
        </div>

        <div id="mobile">
          <i
            id="bar"
            className={this.state.clicked ? "fa fa-times" : "fa fa-bars"}
            onClick={this.handleClick}
          ></i>
        </div>
      </div>
    );
  }
}

export default RightNav;
