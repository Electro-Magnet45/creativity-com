import React from "react";
import "./Item.css";

const Item = ({ imageUrl, userName }) => {
  //
  return (
    <div className="item">
      <div className="item__itemDiv">
        <div className="item__detailsDiv">
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
