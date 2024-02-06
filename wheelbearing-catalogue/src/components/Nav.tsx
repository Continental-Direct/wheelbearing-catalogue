import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      <h2>CONTINENTAL DIRECT</h2>
      <Link to="/">
        <img src={"/continental.png"} alt="Logo" className="navbar-logo" />
      </Link>
    </nav>
  );
};

export default Nav;
