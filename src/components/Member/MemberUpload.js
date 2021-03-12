import React, { useEffect, useState } from "react";
import "./MemberUpload.css";
import { Button, TextField, CircularProgress } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import axios from "../../axios";

const MemberUpload = ({ userId }) => {
  //
  var history = useHistory();

  const [currentState, setCurrentState] = useState("Upload Your Creativity");
  const [imageUrl, setImageUrl] = useState(null);
  const [itemName, setItemName] = useState("");
  const [showProgress, setShowProgress] = useState(false);

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "drcxef0qi",
      uploadPreset: "j2cq4uw4",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        setImageUrl(result.info.secure_url);
      }
    }
  );

  const widgetButtonOpen = (e) => {
    e.preventDefault();
    myWidget.open();
  };

  const startUpload = () => {
    setShowProgress(true);

    axios
      .post("api/newItem", {
        name: itemName,
        image: imageUrl,
        userName: localStorage.getItem("userName"),
        userId: userId,
      })
      .then(() => {
        setShowProgress(false);
        setTimeout(() => {
          history.push("/members/home");
        }, 1000);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector(".containerDiv__containerBox")
        .classList.remove("upload__show");
    }, 800);
  }, []);

  return (
    <div className="memberUpload">
      {showProgress && (
        <div className="progressBarDiv">
          <CircularProgress />
        </div>
      )}
      <div className="memberUpload__uploadcontainerDiv">
        <div className="containerDiv__backBox">
          <h1>{currentState}</h1>
          <div className="backBox__divider"></div>
        </div>

        <div id="uploadDiv" className="containerDiv__containerBox upload__show">
          <h1>Upload It!</h1>
          <div className="containerBox__buttonContainer">
            <Button
              onClick={(e) => widgetButtonOpen(e)}
              id="upload_widget"
              className="cloudinary-button"
            >
              Upload files
            </Button>
          </div>

          <div className="containerBox__continueDiv">
            {imageUrl && (
              <Button
                className="containerBox__continueButton"
                onClick={() => {
                  document
                    .querySelector(".containerDiv__containerBox")
                    .classList.add("hideDivAnime");
                  document
                    .querySelector(".inputContainer")
                    .classList.remove("hideDivFully");
                  document
                    .querySelector(".inputContainer")
                    .classList.add("showDivAnime");

                  setTimeout(() => {
                    document
                      .querySelector(".containerDiv__containerBox")
                      .classList.add("hideDivFully");

                    setCurrentState("Enter Details");
                  }, 3000);
                }}
              >
                Continue
              </Button>
            )}
          </div>
        </div>

        <div id="inputDiv" className="inputContainer hideDivFully">
          <TextField
            className="nameInput"
            label="Enter A Name"
            variant="outlined"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <div className="inputContainer__continueDiv">
            <Button
              className="inputContainer__continueButton"
              onClick={startUpload}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberUpload;
