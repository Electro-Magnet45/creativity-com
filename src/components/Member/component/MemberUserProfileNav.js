import React from "react";
import "./MemberUserProfileNav.css";

const MemberUserProfileNav = ({ clickedlink, setClickedLink }) => {
  return (
    <div className="memberUserProfileNav">
      <div className="memberUserProfile__navBar">
        <div
          id="Posts"
          className="navBar__linkItem"
          onClick={(e) => {
            if (e.target.innerText !== clickedlink) {
              setClickedLink(e.target.innerText);
            }
          }}
        >
          <h2>Posts</h2>
        </div>

        <div
          id="Liked"
          className="navBar__linkItem"
          onClick={(e) => {
            if (e.target.innerText !== clickedlink) {
              setClickedLink(e.target.innerText);
            }
          }}
        >
          <h2>Liked</h2>
        </div>

        <div
          id="Followers"
          className="navBar__linkItem"
          onClick={(e) => {
            if (e.target.innerText !== clickedlink) {
              setClickedLink(e.target.innerText);
            }
          }}
        >
          <h2>Followers</h2>
        </div>

        <div
          id="Following"
          className="navBar__linkItem"
          onClick={(e) => {
            if (e.target.innerText !== clickedlink) {
              setClickedLink(e.target.innerText);
            }
          }}
        >
          <h2>Following</h2>
        </div>
      </div>
    </div>
  );
};

export default MemberUserProfileNav;
