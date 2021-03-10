import React, { useState, useEffect } from "react";
import "./Login.css";

import firebase from "../../firebase";
import { TextField, Button, Tooltip } from "@material-ui/core";

function Login({ loggedIn }) {
  //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [waitingForLogin, setWaitingForLogin] = useState(false);

  const loginInUser = () => {
    if (!loggedIn) {
      if (email && password) {
        setWaitingForLogin(true);
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            console.log("logged in");
            setWaitingForLogin(false);
            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            console.log(
              "An error of code: " +
                error.code +
                " and message: " +
                error.message +
                " occured"
            );
          });
      } else {
        setTooltipOpen(true);
      }
    }
  };

  useEffect(() => {
    if (tooltipOpen) {
      setTimeout(() => {
        setTooltipOpen(false);
      }, 4000);
    }
  }, [tooltipOpen]);

  return (
    <div className="login">
      <div className="login__logoContainer">
        <h3>Creativity.com</h3>
      </div>
      <div className="login__loginContainer">
        <div className="loginContainer__formContainer">
          <div className="formContainer__header">
            <h1>Login</h1>
            <h3>Please enter your information</h3>
          </div>
          <div className="formContainer__inputContainer">
            <Tooltip
              title="Enter A Vaild Email"
              arrow
              placement="right"
              open={tooltipOpen}
              disableFocusListener={true}
              disableHoverListener={true}
              disableTouchListener={true}
            >
              <TextField
                id="standard-basic"
                label="Email"
                value={email}
                inputProps={{
                  autoComplete: "off",
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Tooltip>

            <Tooltip
              title="Enter A Valid Password"
              arrow
              placement="right"
              open={tooltipOpen}
              disableFocusListener={true}
              disableHoverListener={true}
              disableTouchListener={true}
            >
              <TextField
                label="Password"
                type="password"
                inputProps={{
                  autoComplete: "new-password",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Tooltip>

            <Button
              variant="contained"
              color="primary"
              disabled={waitingForLogin}
              onClick={loginInUser}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
