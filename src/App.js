import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "./axios";
import firebase from "./firebase";

import HomeHeader from "./HomeHeader";
import Home from "./components/Home/Home";
import Register from "./components/Home/Register";
import Login from "./components/Home/Login";

import MemberHeader from "./MemberHeader";
import MemberHome from "./components/Member/MemberHome";
import MemberUpload from "./components/Member/MemberUpload";
import MemberUserProfile from "./components/Member/MemberUserProfile";
import MemberItem from "./components/Member/MemberItem";
import MemberProfile from "./components/Member/MemberProfile";

function App() {
  //
  const [loggedIn, setLogggedIn] = useState(null);
  const [userId, setUserId] = useState(null);
  const [socket, setSocket] = useState(null);

  const ErrorPage = () => {
    return (
      <div className="errorPage">
        <h1>404</h1>
        <h3>The Page was not Found</h3>
      </div>
    );
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        sessionStorage.setItem("loggedIn", true);
        setLogggedIn(true);
        setUserId(user.uid);
      } else {
        sessionStorage.setItem("loggedIn", false);
        setLogggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      if (!localStorage.getItem("userName")) {
        axios
          .post("/api/findUser", {
            userId: userId,
          })
          .then((response) => {
            localStorage.setItem("userName", response.data[0].name);
            localStorage.setItem("userPhoto", response.data[0].profilePhoto);
          });
      }

      if (!localStorage.getItem("userPhoto")) {
        axios
          .post("/api/findUser", {
            userId: userId,
          })
          .then((response) => {
            localStorage.setItem("userName", response.data[0].name);
            localStorage.setItem("userPhoto", response.data[0].profilePhoto);
          });
      }
    }
  }, [userId]);

  return (
    <div className="App">
      <Router>
        {loggedIn ? <MemberHeader /> : <HomeHeader />}
        <Switch>
          <Route exact path="/">
            <Home loggedIn={loggedIn} />
          </Route>
          <Route path="/register">
            <Register loggedIn={loggedIn} />
          </Route>
          <Route path="/login">
            <Login loggedIn={loggedIn} />
          </Route>

          {!loggedIn && (
            <Route path="/members">
              <ErrorPage />
            </Route>
          )}
          {loggedIn && (
            <Route path="/members/home">
              <MemberHome socket={socket} setSocket={setSocket} />
            </Route>
          )}
          {loggedIn && (
            <Route path="/members/upload">
              <MemberUpload userId={userId} socket={socket} />
            </Route>
          )}
          {loggedIn && (
            <Route exact path="/members/user">
              <MemberUserProfile userId={userId} />
            </Route>
          )}
          {loggedIn && (
            <Route path="/members/user/:userId">
              <MemberProfile />
            </Route>
          )}
          {loggedIn && (
            <Route path="/members/item/:itemId">
              <MemberItem />
            </Route>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
