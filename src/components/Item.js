import React, { useEffect, useState } from "react";
import "./Item.css";

const Item = ({ imageUrl, userName }) => {
  //
  const [hieght, setHieght] = useState(null);
  const [width, setWidth] = useState(null);

  const windowSizeChanged = () => {
    var elmnt = document.querySelector(".item__itemDiv");
    setHieght(elmnt.clientHeight);
    setWidth(elmnt.clientWidth);
  };

  useEffect(() => {
    setTimeout(() => {
      var elmnt = document.querySelector(".item__itemDiv");
      setHieght(elmnt.clientHeight);
      setWidth(elmnt.clientWidth);
    }, 1000);
  }, []);

  useEffect(() => {
    if (hieght && width) {
      window.addEventListener("resize", windowSizeChanged);
    }
  }, [hieght, width]);

  return (
    <div className="item">
      <div className="item__itemDiv">
        {hieght && width && (
          <div
            className="item__detailsDiv"
            style={{ width: width, hieght: hieght }}
          >
            <div className="detailsDiv__itemName">
              <h3>{userName}</h3>
            </div>
          </div>
        )}

        <img id="imagettt" src={imageUrl} alt="Creativity.com" />
      </div>
    </div>
  );
};

export default Item;
