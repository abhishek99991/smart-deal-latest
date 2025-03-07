import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div>
      <div className="footer-bg">
        <div className="flex space-bw footer-top">
          <div className="col-30 footer-head">
            <div className="ds-logo">
              <img src={logo} alt="" />
            </div>
            <p>
              Deal Smart Trading LLC <br /> 1004, Titanium Tower, AL Karama{" "}
              <br />
              Dubai, UAE
            </p>
          </div>
          <div className="col-20 footer-menu">
            <div className="foot-links">Links</div>
            <ul>
              <li>
                <Link to="/"> Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-20 footer-menu">
            <div className="foot-links">Help</div>
            <ul>
              <li>Payment Options</li>
              <li>Returns</li>
              <li>Privacy Policies</li>
            </ul>
          </div>
          <div className="col-30 foot-news">
            <div className="foot-news-inner">Newsletter</div>
            <div className="flex align-center foot-subscribe">
              <input type="text" placeholder="Enter Your Email Address" />
              <p>SUBSCRIBE</p>
            </div>
          </div>
        </div>
        <div className="right-reserve">
          2025 Deal Smart. All rights reverved
        </div>
      </div>
    </div>
  );
};

export default footer;
