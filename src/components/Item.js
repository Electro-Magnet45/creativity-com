import React from "react";
import "./Item.css";

import { useHistory } from "react-router-dom";

const Item = ({ itemId, imageUrl, userName }) => {
  //
  const history = useHistory();

  return (
    <div className="item">
      <div className="item__itemDiv">
        <div
          className="item__detailsDiv"
          onClick={() => history.push(`/members/item/${itemId}`)}
        >
          <div className="detailsDiv__itemName">
            <h3>{userName}</h3>
          </div>
        </div>

        <img id="imagettt" src={imageUrl} alt="Creativity.com" />
      </div>
    </div>
  );
};

export default Item;
