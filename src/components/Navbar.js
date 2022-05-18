import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";

function Navbar() {
  return (
    <header>
      <nav>
        <div className="navbar">
          <div className="nav-left-content">
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
            </ul>
          </div>
          <div className="nav-right-content">
            <ExternalLink href="https://github.com/NathanMillier">
              <i className="fab fa-github-square"></i>
            </ExternalLink>
            <ExternalLink href="https://www.linkedin.com/in/nathan-millier/">
              <i className="	fab fa-linkedin"></i>
            </ExternalLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
