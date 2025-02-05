import "../../CSS/Footer.css";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <section className="about">
          <h3>Continental Direct UK Ltd</h3>
          <p>
            The route to profit. Leading supplier of high-quality vehicle
            replacement parts made to exacting standards
            <br /> and priced to offer the competitive edge.
          </p>
        </section>

        <div className="footer-right">
          <section className="contact">
            <h3>Contact Us</h3>
            <ul className="contact-list">
              <li>📞 +44 (0)1623 755125</li>
              <li>
                <FaTwitter />{" "}
                <a href="https://twitter.com/cd_uk_ltd" className="footer-link">
                  @CD_UK_Ltd
                </a>
              </li>
              <li>
                <FaFacebook />{" "}
                <a
                  href="https://www.facebook.com/Continental-Direct-119294114847485/?ref=page_internal"
                  className="footer-link"
                >
                  @ContinentalDirect
                </a>
              </li>
              <li>
                <FaInstagram />{" "}
                <a
                  href="https://www.instagram.com/continentaldirectukltd/"
                  className="footer-link"
                >
                  continentaldirectukltd
                </a>
              </li>
            </ul>
          </section>

          <section className="address">
            <h3>Address</h3>
            <p>Continental Direct UK Ltd</p>
            <p>Greenwood House</p>
            <p>Nottingham</p>
            <p>NG17 7LE</p>
            <p>United Kingdom</p>
          </section>
        </div>
      </div>
      <div className="footer-divider"></div> {/* New border above copyright */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          Copyright &copy; Continental Direct UK Ltd. All rights reserved.
          2016-2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
