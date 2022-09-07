import React from "react";
import { ExternalLink } from "react-external-link";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <footer>
        <div className="footer">
          <div className="go-up">
            <img
              src="img/white-arrow.png"
              alt="arrow point up"
              className="up-arrow"
              onClick={() => scrollTop()}
            />
          </div>
          <div className="footer-links">
            <div className="footer-socials">
              <ExternalLink href="https://github.com/NathanMillier">
                <i className="fab fa-github-square"></i>
              </ExternalLink>
              <ExternalLink href="https://www.linkedin.com/in/nathan-millier/">
                <i className="	fab fa-linkedin"></i>
              </ExternalLink>
            </div>
            <div className="footer-menu">
              <ul className="nav-list-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Projects">My projects</Link>
                </li>
                <li>
                  <Link to="/Contact">Contact me</Link>
                </li>
                <li>
                  <Link to="/Login">Login</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright">
            © NATHAN MILLIER | ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
