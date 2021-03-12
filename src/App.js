import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "./firebase";

import HomeHeader from "./HomeHeader";
import Home from "./components/Home/Home";
import Register from "./components/Home/Register";
import Login from "./components/Home/Login";

import MemberHeader from "./MemberHeader";
import MemberHome from "./components/Member/MemberHome";
import MemberUpload from "./components/Member/MemberUpload";
import MemberUserProfile from "./components/Member/MemberUserProfile";

function App() {
  //
  const [loggedIn, setLogggedIn] = useState(null);
  const [userId, setUserId] = useState(null);

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
              <MemberHome />
            </Route>
          )}
          {loggedIn && (
            <Route path="/members/upload">
              <MemberUpload userId={userId} />
            </Route>
          )}
          {loggedIn && (
            <Route path="/members/user">
              <MemberUserProfile userId={userId} />
            </Route>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
