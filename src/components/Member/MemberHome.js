import React, { useState, useEffect } from "react";
import "./MemberHome.css";
import { Button } from "@material-ui/core";
import Item from "../Item";

import axios from "../../axios";
import { useHistory } from "react-router-dom";

const MemberHome = () => {
  //
  var history = useHistory();

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("api/findItems/all").then((response) => {
      setItems(response.data);
    });
  }, []);

  return (
    <div className="memberHome">
      <div className="memberHome__header">
        <div className="header__profile">
          <img
            className="profile__profilePicture"
            src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
            alt=""
            onClick={() => {
              history.push("/members/user");
            }}
          />
        </div>
      </div>
      <div className="memberHome__landingSection">
        <div className="landingSection__titleSection">
          <div className="titleSection__titleDiv">
            <h1>Hi !</h1>
            <h3>{localStorage.getItem("userName")}</h3>
            <Button onClick={() => history.push("/members/upload")}>
              Start Uploading
            </Button>
            <div className="titleDiv__divider"></div>
          </div>
        </div>
        <div className="landingSection__logoSection">
          <h3>Creativity.com</h3>
        </div>
      </div>

      <div className="memberHome__itemsSection">
        <div className="itemsSection__titleDiv">
          <h2>Discover other's talent...</h2>
        </div>

        <div className="itemsSection__items">
          {items &&
            items.map((item) => {
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
    </div>
  );
};

export default MemberHome;
