const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>CONTINENTAL DIRECT UK LTD</h2>
          <p>
            The route to profit. Leading supplier of high quality vehicle
            replacement parts made to exacting standards and priced to offer the
            competitive edge.
          </p>
          <button onClick={scrollToTop} className="top-button">
            TOP
          </button>
        </div>
        <div className="footer-section">
          <h2>CONTACT US</h2>
          <p>📞 +44 (0)1623 755125</p>
          <p>Twitter: @CD_UK_Ltd</p>
          <p>Facebook: @ContinentalDirect</p>
          <p>Instagram: continentaldirectukltd</p>
        </div>
        <div className="footer-section">
          <h2>ADDRESS</h2>
          <p>Continental Direct UK Ltd</p>
          <p>Greenwood House</p>
          <p>Nottingham</p>
          <p>NG17 7LE</p>
          <p>United Kingdom</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          COPYRIGHT © CONTINENTAL DIRECT UK LTD. ALL RIGHTS RESERVED. 2016-2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
