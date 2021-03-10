import React from "react";
import "./HomeHeader.css";

import { Link } from "react-router-dom";

const HomeHeader = () => {
  //

  window.onscroll = function (a) {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 59
    ) {
      document.querySelector(".header__logoSection").classList.add("white");
    } else {
      document.querySelector(".header__logoSection").classList.remove("white");
    }
  }

  return (
    <div className="header">
      <div className="header__logoSection">
        <h3>Creativity.com</h3>
      </div>
      <div className="header__navLinkSection">
        <h3>
          <Link to="/">Home</Link>
        </h3>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
        <h3>
          <Link to="/login">Login</Link>
        </h3>
      </div>
    </div>
  );
};

export default HomeHeader;
