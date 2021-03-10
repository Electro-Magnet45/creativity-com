import React from "react";
import "./Home.css";

import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

function Home({ loggedIn }) {
  //
  var history = useHistory();

  return (
    <div className="home">
      <div className="home__landingSection">
        <div className="home__motionDiv">
          <h1>
            Don't worry ! <br />
            This is not a site, <br /> it's a world!
          </h1>
        </div>
        <motion.button
          className="home__registerButton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (!loggedIn) {
              history.push("/register");
            } else {
              history.push("/members/home");
            }
          }}
        >
          {loggedIn ? <h3>Go to Home</h3> : <h3>Getting Started</h3>}
        </motion.button>
      </div>
    </div>
  );
}

export default Home;
