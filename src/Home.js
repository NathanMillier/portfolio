import React, { Component, useEffect, useState } from "react";
import Bio from "./components/Bio";
import { CSSTransition } from "react-transition-group";

const Home = () => {
  const [appear, setAppear] = useState(false);
  const [buttonText, setButtonText] = useState("Discover more");

  const changeButtonText = () => {
    if (!appear) {
      setButtonText("Show less");
      return;
    }
    setButtonText("Discover more");
  };

  return (
    <div className="content-container">
      <div className="welcome-titles">
        <h1>Hello from Nathan Millier</h1>
        <h2 className="home-sub-heading">
          Junior web developer ready to change the world. (yes, yes, the
          world...)
        </h2>
        <button
          className="discover-button"
          onClick={() => {
            setAppear(appear ? false : true);
            changeButtonText();
          }}
        >
          {buttonText}
        </button>
      </div>

      <CSSTransition in={appear} timeout={100} classNames="about-me-container">
        <Bio />
      </CSSTransition>
    </div>
  );
};

export default Home;
