import React, { useEffect, useState } from "react";
import "./MemberItem.css";
import { Button } from "@material-ui/core";
import Skeleton from "react-loading-skeleton";

import { useLocation, Link } from "react-router-dom";
import axios from "../../axios";

const MemberItem = () => {
  //
  const location = useLocation();

  const [item, setItem] = useState([]);
  const [didItemsLoad, setDidItemsLoad] = useState(false);

  useEffect(() => {
    const currentItemId = location.pathname.substr(14);

    axios
      .post("api/findItems/id", {
        itemId: currentItemId,
      })
      .then((response) => {
        setItem(response.data);
        setTimeout(() => {
          setDidItemsLoad(true);
        }, 1000);
      });
  }, []);

  return (
    <div className="memberItem">
      <div className="memberItem__container">
        <div className="container__landingSection">
          <div className="landingSection__imageDiv">
            <div className="imageDiv__container">
              {didItemsLoad ? (
                <img src={item.image} alt="Creativity.com" />
              ) : (
                <Skeleton className="imageDiv__imageSkelton" />
              )}
            </div>
          </div>

          <div className="landingSection__infoDiv">
            <div className="infoDiv__container">
              {didItemsLoad ? (
                <h2>{item.userName}</h2>
              ) : (
                <Skeleton className="infoDiv__userNameSkelton" />
              )}

              {didItemsLoad ? (
                <Button>
                  <a href={item.image} download>
                    Download
                  </a>
                </Button>
              ) : (
                <Skeleton className="infoDiv__downloadBtnSkelton" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberItem;
