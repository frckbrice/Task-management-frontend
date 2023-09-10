import React, { Component } from "react";
import "./RightNav.css";
import "font-awesome/css/font-awesome.min.css";

class RightNav extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  signupPage = () => {
    this.props.history.push('/signup')
  }

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
                <a href="/features">Features</a>
              </li>
              <li>
                <a href="/teams">For Teams</a>
              </li>
              <li>
                <a href="/help">Get Help</a>
              </li>
            </ul>
          </div>

          <div className="btn">
            <button className="reg" onClick={this.signupPage}>Sign Up</button>
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
