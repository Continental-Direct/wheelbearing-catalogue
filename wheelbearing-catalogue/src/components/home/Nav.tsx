import { Link } from "react-router-dom";
import "../../CSS/Nav.css";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title-link" aria-label="Go to Home">
          <span className="navbar-title">Homepage</span>
        </Link>
        <Link to="/" className="navbar-subtitle-link" aria-label="Go to Home">
          <span className="navbar-subtitle">Wheel Bearings</span>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-logo-link" aria-label="Go to Home">
          <img
            src={"/continental.png"}
            alt="Continental Direct Logo"
            className="navbar-logo"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
