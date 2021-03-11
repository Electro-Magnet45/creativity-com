import React, { useEffect, useState } from "react";
import "./Register.css";

import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import axios from "../../axios";
import { TextField, Button, Tooltip } from "@material-ui/core";

function Register({ loggedIn }) {
  //
  var history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [waitingForRegister, setWaitingForRegister] = useState(false);
  const [waitingForAddingUser, setWaitingForAddingUser] = useState(false);
  const [name, setName] = useState("");
  const [showRegisterBox, setShowRegisterBox] = useState(true);
  const [showInfoBox, setShowInfoBox] = useState(false);

  const signInUser = () => {
    if (!loggedIn) {
      if (email && password) {
        setWaitingForRegister(true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            setUserId(userCredential.user.uid);
            setWaitingForRegister(false);
            setEmail("");
            setPassword("");

            setShowInfoBox(true);
            document
              .querySelector(".register__InfoFormContainer")
              .classList.remove("hidden");
            document
              .querySelector(".register__InfoFormContainer")
              .classList.add("visible");
            document
              .querySelector(".registerContainer__formContainer")
              .classList.add("hidden");
            setTimeout(() => {
              setShowRegisterBox(false);
            }, 500);
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

  const addUser = () => {
    if (name) {
      setWaitingForAddingUser(true);
      localStorage.setItem("userName", name);

      axios
        .post("/api/newUser", {
          name: name,
          userId: userId,
        })
        .then((response) => {
          if (response.status === 201) {
            setTimeout(() => {
              history.push("/members/home");
            }, 500);
          }
        });
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
    <div className="register">
      <div className="register__logoContainer">
        <h3>Creativity.com</h3>
      </div>
      <div className="register__registerContainer">
        {showRegisterBox && (
          <div className="registerContainer__formContainer">
            <div className="formContainer__header">
              <h1>Register</h1>
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
                disabled={waitingForRegister}
                onClick={signInUser}
              >
                Register
              </Button>
            </div>
          </div>
        )}

        {showInfoBox && (
          <div className="register__InfoFormContainer hidden">
            <div className="infoFormContainer__header">
              <h1>Register</h1>
              <h3>Please enter your information</h3>
            </div>

            <div className="infoFormContainer__inputContainer">
              <TextField
                id="standard-basic"
                label="Full Name"
                value={name}
                inputProps={{
                  autoComplete: "off",
                }}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                disabled={waitingForAddingUser}
                onClick={addUser}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
