import React, { useEffect, useState } from "react";
import "./MemberUserProfile.css";
import MemberUserProfileNav from "./component/MemberUserProfileNav";
import Item from "../Item";

import axios from "../../axios";

const MemberUserProfile = ({ userId }) => {
  //
  const [clickedlink, setClickedLink] = useState("Posts");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (userId) {
      axios
        .post("/api/findItems/userId", {
          userId: userId,
        })
        .then((response) => {
          setFilteredItems(response.data);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (clickedlink) {
      document.getElementById(clickedlink).classList.add("selectedLinkItem");

      const allLinkItems = document.querySelectorAll(".navBar__linkItem");
      var numberOfItems = allLinkItems.length;

      for (var i = 0; i < numberOfItems; i++) {
        if (allLinkItems[i].children[0].innerText !== clickedlink) {
          allLinkItems[i].classList.remove("selectedLinkItem");
        }
      }
    }
  }, [clickedlink]);

  return (
    <div className="memberUserProfile">
      <div className="memberUserProfile__profileArea">
        <div className="profileArea__profileDiv">
          <div className="profileDiv__imageDiv">
            <img
              className="imageDiv__profilePicture"
              src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
              alt=""
            />
          </div>
          <div className="profileDiv__userNameDiv">
            <h2>{localStorage.getItem("userName")}</h2>
          </div>
        </div>
        <div className="profileArea__divider"></div>

        <MemberUserProfileNav
          clickedlink={clickedlink}
          setClickedLink={setClickedLink}
        />
      </div>

      {filteredItems && (
        <div className="memberUserProflie__itemSection">
          <div className="memberUserProflie__items">
            {filteredItems.map((item) => {
              return (
                <Item
                  key={Math.random()}
                  imageUrl={item.image}
                  userName={item.userName}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberUserProfile;
