import React from "react";

const Bio = () => {
  return (
    <div className="about-me-container">
      <h2>About me</h2>
      <p>
        Born and raised in Switzerland, I moved in the US early 2019 with the
        intention of becoming bilingual. After graduating from the English
        Language Program at UNF, I decided to pursue my career here, and settle
        down in Jacksonville, FL.
      </p>

      <div className="skills">
        <h3 className="skill-title">My skills</h3>
        <div className="skill-content">
          <ul className="skill-list">
            <li>React.js</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>APIs</li>
            <li>PostgreSQL</li>
            <li>Git and GitHub</li>
          </ul>
          <img
            src="img/me.jpeg"
            alt="nathan in a tuxedo"
            className="bio-picture"
          />
        </div>
      </div>
    </div>
  );
};

export default Bio;
