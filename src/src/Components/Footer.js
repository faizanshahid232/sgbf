import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-between" style={{ borderBottom: '1px solid #626262' }}>
          <div className="col-md-12 col-lg-5">
            <div className="footer-logo">
              <h6
                style={{
                  color: '#828282',
                  fontWeight: 700,
                  lineHeight: 2.875,
                  fontSize: 18,
                }}
              >
                Address
              </h6>

              <ul className="list-unstyled">
                <li>
                  <p style={{ fontSize: 16 }}>SAUDI GREEN BUILDING FORUM</p>
                </li>
                <li>
                  <p style={{ fontSize: 16 }}>7215 Abdullah Al Sahmi Street - Diplomatic Quarter Unit</p>
                </li>
                <li>
                  <p style={{ fontSize: 16 }}>No 2 Riyadh 12512 - 2996 Kingdom Of Saudi Arabia</p>
                </li>
                <li>
                  <p style={{ fontSize: 16 }}>Kingdom Of Saudi Arabia</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-6 col-md-3 col-lg-2">
            <div className="list-menu">
              <h6
                style={{
                  color: '#828282',
                  fontWeight: 700,
                  lineHeight: '2.875',
                  fontSize: 18,
                }}
              >
                About Us
              </h6>
              <ul className="list-unstyled">
                <li>
                  <Link className="bl_class" to="/about" style={{ fontSize: 16 }}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="bl_class" to="/membership" style={{ fontSize: 16 }}>
                    Membership
                  </Link>
                </li>
                <li>
                  <Link className="bl_class" to="/terms" style={{ fontSize: 16 }}>
                    Terms Of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-6 col-md-3 col-lg-2">
            <div className="list-menu">
              <h6
                style={{
                  color: '#828282',
                  fontWeight: 700,
                  lineHeight: '2.875',
                  fontSize: 18,
                }}
              >
                DIRECTORY
              </h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/articles" className="bl_class" style={{ fontSize: 16 }}>
                    Articles
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="bl_class" style={{ fontSize: 16 }}>
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/directory/people" className="bl_class" style={{ fontSize: 16 }}>
                    People
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="bl_class" style={{ fontSize: 16 }}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/market-place" className="bl_class" style={{ fontSize: 16 }}>
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-sm-6 col-md-3 col-lg-2">
            <div className="list-menu">
              <h6
                style={{
                  color: '#828282',
                  fontWeight: 700,
                  lineHeight: '2.875',
                  fontSize: 18,
                }}
              >
                FOLLOWS US
              </h6>
              <ul className="list-unstyled">
                <li>
                  <a
                    className="bl_class"
                    href="https://www.facebook.com/saudigreen"
                    target=".blank"
                    style={{ fontSize: 16 }}
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    className="bl_class"
                    target=".blank"
                    href="https://www.twitter.com/SaudiGBF"
                    style={{ fontSize: 16 }}
                  >
                    twitter
                  </a>
                </li>
                <li>
                  <a
                    className="bl_class"
                    target=".blank"
                    href="http://www.linkedin.com/company/saudi-green-building-forum"
                    style={{ fontSize: 16 }}
                  >
                    Linkdin
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@sgbf.sa"
                    className="bl_class"
                    style={{ fontSize: 16, textTransform: 'lowercase' }}
                  >
                    info@sgbf.sa
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <hr> */}
      </div>

      <div className="copyrights">
        <p
          className="text-center mt-0 mb-5"
          style={{
            color: '#828282',
            fontSize: 12,
            fontWeight: 'bold',
            transform: 'scaleX(1.0011)',
          }}
        >
          ©
          <Link to="/terms" style={{ color: '#828282' }}>
            Terms of Use
          </Link>
          | © 2023 Saudi Green Building Forum
        </p>
      </div>
    </footer>
  );
};

export default Footer;
