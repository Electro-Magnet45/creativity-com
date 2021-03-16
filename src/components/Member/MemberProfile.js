import React, { useEffect, useState } from "react";
import "./MemberProfile.css";

import { useLocation } from "react-router-dom";

import MemberUserProfileNav from "./component/MemberUserProfileNav";
import Item from "../Item";
import Skeleton from "react-loading-skeleton";

import axios from "../../axios";

const MemberProfile = () => {
  //
  const location = useLocation();

  const userId = location.pathname.substr(14);
  const userName = location.search.substr(10);

  const [clickedlink, setClickedLink] = useState("Posts");
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);

  useEffect(() => {
    if (userId) {
      axios
        .post("/api/findItems/userId", {
          userId: userId,
        })
        .then((response) => {
          setFilteredItems(response.data);
          setTimeout(() => {
            setItemsLoaded(true);
          }, 2000);
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
    <div className="memberProfile">
      <div className="memberProfile__profileArea">
        <div className="profileArea__profileDiv">
          <div className="profileDiv__imageDiv">
            <img
              className="imageDiv__profilePicture"
              src={localStorage.getItem("userPhoto")}
              alt="Creativty.com"
            />
          </div>
          <div className="profileDiv__userNameDiv">
            <h2>{userName}</h2>
          </div>
        </div>
        <div className="profileArea__divider"></div>

        <MemberUserProfileNav
          clickedlink={clickedlink}
          setClickedLink={setClickedLink}
        />
      </div>

      <div className="memberProflie__itemSection">
        {itemsLoaded ? (
          <div className="memberProflie__items">
            {filteredItems.map((item) => {
              return (
                <Item
                  key={item._id}
                  imageUrl={item.image}
                  userName={item.userName}
                />
              );
            })}
          </div>
        ) : (
          <div className="memberPorfileItems__preloaderDiv">
            <Skeleton className="memberPorfileItems__skelton" />
            <Skeleton className="memberPorfileItems__skelton" />
            <Skeleton className="memberPorfileItems__skelton" />
            <Skeleton className="memberPorfileItems__skelton" />
            <Skeleton className="memberPorfileItems__skelton" />
            <Skeleton className="memberPorfileItems__skelton" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberProfile;
