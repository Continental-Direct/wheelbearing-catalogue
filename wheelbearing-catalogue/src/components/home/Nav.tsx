import "../../CSS/Nav.css";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">CONTINENTAL DIRECT</span>
        <span className="navbar-subtitle">Wheel Bearings</span>
      </div>
      <div className="navbar-right">
        <img src={"/continental.png"} alt="Logo" className="navbar-logo" />
      </div>
    </nav>
  );
};

export default Nav;
