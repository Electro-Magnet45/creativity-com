import React from "react";
import "./MemberHeader.css";

import { Link } from "react-router-dom";

const MemberHeader = () => {
  //
  window.onscroll = function (a) {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 59
    ) {
      document
        .querySelector(".memberHeader__logoSection")
        .classList.add("white");
    } else {
      document
        .querySelector(".memberHeader__logoSection")
        .classList.remove("white");
    }
  }

  return (
    <div className="memberHeader">
      <div className="memberHeader__logoSection">
        <h3>Creativity.com</h3>
      </div>

      <div className="memberHeader__navLinkSection">
        <h3>
          <Link to="/members/home">Home</Link>
        </h3>
      </div>
    </div>
  );
};

export default MemberHeader;
