import React from "react";
import "./Item.css";

import { useHistory } from "react-router-dom";

const Item = ({ itemId, imageUrl, userName, userId }) => {
  //
  const history = useHistory();

  return (
    <div className="item">
      <div className="item__itemDiv">
        <div className="item__detailsDiv">
          <div className="detailsDiv__itemName">
            <h3
              onClick={() =>
                history.push(`/members/user/${userId}?userName=${userName}`)
              }
            >
              {userName}
            </h3>
          </div>
          <div
            className="detailsDiv__imageDiv"
            onClick={() => history.push(`/members/item/${itemId}`)}
          ></div>
        </div>

        <img id="imagettt" src={imageUrl} alt="Creativity.com" />
      </div>
    </div>
  );
};

export default Item;
