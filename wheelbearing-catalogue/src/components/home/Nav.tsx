import { Link } from "react-router-dom";
import { useState } from "react";
import "../../CSS/nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* Left Side (Homepage & Wheel Bearings) */}
      <div className="navbar-left">
        <Link to="/" className="navbar-title-link" aria-label="Go to Home">
          <span className="navbar-title">Homepage</span>
        </Link>
        <Link to="/" className="navbar-subtitle-link" aria-label="Go to Home">
          <span className="navbar-subtitle">Wheel Bearings</span>
        </Link>
      </div>

      <div className="navbar-right">
        <button
          className="hamburger-btn"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className={`hamburger-line ${menuOpen ? "open" : ""}`}></div>
          <div className={`hamburger-line ${menuOpen ? "open" : ""}`}></div>
          <div className={`hamburger-line ${menuOpen ? "open" : ""}`}></div>
        </button>
        <span className="navbar-subtitle">Catalogues</span>
        {menuOpen && (
          <div className="hamburger-menu">
            <ul>
              <li>
                <a
                  href="https://shockabsorbers-test-v3.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  Shock Absorbers
                </a>
              </li>
              <li>
                <a
                  href="https://coil-springs-test-v3.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  Coil Springs
                </a>
              </li>
              <li>
                <a
                  href="https://cv-boots-test-v3.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  CV Boots
                </a>
              </li>
              <li>
                <a
                  href="https://strutmounts-test-v3.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  Strutmounts
                </a>
              </li>
              <li>
                <a
                  href="https://wiperblades-test-v3.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  Wiperblades
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
