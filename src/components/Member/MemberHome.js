import React, { useState, useEffect } from "react";
import "./MemberHome.css";
import { Button } from "@material-ui/core";
import Item from "../Item";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "react-loading-skeleton";

import { useHistory } from "react-router-dom";
import axios from "../../axios";
import { io } from "socket.io-client";

const MemberHome = ({ socket, setSocket }) => {
  //
  var history = useHistory();

  const [items, setItems] = useState([]);
  const [didItemsLoad, setDidItemsLoad] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastContent, setToastContent] = useState(null);

  const connectSocket = () => {
    setSocket(io("wss://creativity-com.herokuapp.com"));
  };

  useEffect(() => {
    axios.get("api/findItems/all").then((response) => {
      setItems(response.data);
      setTimeout(() => {
        setDidItemsLoad(true);
      }, 2000);
    });
    connectSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("newItem", (item) => {
        const newItem = JSON.parse(item);
        console.log(newItem);
        console.log(newItem.userName);
        setToastContent(newItem);
        setToastOpen(true);
      });
    }
  }, [socket]);

  return (
    <div className="memberHome">
      <div className="memberHome__toastDiv">
        {toastOpen && (
          <Snackbar
            open={toastOpen}
            autoHideDuration={6000}
            onClose={() => {
              setToastOpen(false);
              setToastContent(null);
            }}
          >
            <MuiAlert
              onClose={() => {
                setToastOpen(false);
                setToastContent(null);
              }}
              severity="info"
            >
              {`A new Item has been uploaded by ${toastContent.userName}`}
            </MuiAlert>
          </Snackbar>
        )}
      </div>

      <div className="memberHome__header">
        <div className="header__profile">
          <img
            className="profile__profilePicture"
            src={localStorage.getItem("userPhoto")}
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
          {didItemsLoad ? (
            items.map((item) => {
              return (
                <Item
                  key={item._id}
                  itemId={item._id}
                  imageUrl={item.image}
                  userName={item.userName}
                />
              );
            })
          ) : (
            <div className="itemSection__preloaderDiv">
              <Skeleton className="itemSection__skelton" />
              <Skeleton className="itemSection__skelton" />
              <Skeleton className="itemSection__skelton" />
              <Skeleton className="itemSection__skelton" />
              <Skeleton className="itemSection__skelton" />
              <Skeleton className="itemSection__skelton" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberHome;
