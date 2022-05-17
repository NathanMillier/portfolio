import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";

function Navbar() {
  return (
    <div>
      <nav>
        <div>
          <Link to="/">Home</Link>
          <Link to="/Projects">My projects</Link>
          <Link to="/Contact">Contact me</Link>
        </div>
        <div>
          <ExternalLink href="https://facebook.com">
            <i className="fab fa-facebook"></i>
          </ExternalLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
