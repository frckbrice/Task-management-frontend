import React from "react";
import "./Footer.css";
import {
  FaLinkedin,
  FaFacebookF,
  FaTwitterSquare,
  FaInstagram,
  FaSlack,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="footercontainer">
      <div className="footerIcons">
        <h4 className="head4">You can find us at</h4>
        <icons>
          <FaFacebookF className="icon" />
          <FaLinkedin className="icon" />
          <FaTwitterSquare className="icon" />
          <FaInstagram className="icon" />
          <FaSlack className="icon" />
          <FaYoutube className="icon" />
        </icons>
      </div>

      <div className="footer-divs">
        <div className="div1 div">
          <h4>Let's Talk!</h4>
          <p className="letstalkPar">
            Every project starts with a chat GDB leads our client conversations
            and will be happy to discuss your project.
          </p>
            <label className="inputlabel">Tell us about your project</label>
            <input className="inputfield" type="text" />

        </div>

        <div className="div2 div">
          <h4>Company</h4>
          <p>About</p>
          <p>Careers</p>
          <p>Support</p>
          <p>Pricing</p>
          <p>FAQ</p>
        </div>

        <div className="div3 div">
          <h4>Resources</h4>
          <p>eBooks</p>
          <p>Comparison Guide</p>
          <p>Blog</p>
          <p>Website Grader</p>
          <p>Whitepapers</p>
        </div>

        <div className="div4 div">
          <h4>Get Help</h4>
          <p>Help Center</p>
          <p>Contact Us</p>
          <p>Privacy Policy</p>
          <p>Terms</p>
          <p>Login</p>
        </div>
      </div>

      <div className="copyrightfooter">
        <p>
          Copyright 2020-2023 GDB Dev...| <span>It's free for use</span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
