import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { acuLogo } from '../../assets/images';

const Footer = () => {
  return (
    <section className="footer">
      {/* footer section start */}
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <a href="index.html">
                <img src={acuLogo} alt="Default" className="img-fluid logo-footer" />
              </a>
              <div className="footer-about">
                <p>
                  Australia fosters diverse talents through tailored programs, forging pathways for sustainable success
                  in skill development.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="social-links">
                <h2>Follow Us</h2>
                <div className="social-icons">
                  <li>
                    <a href="" className="d-flex align-items-center">
                      <FiFacebook className="mr-2x" /> Facebook
                    </a>
                  </li>
                  <li>
                    <a href="" className="d-flex align-items-center">
                      <FiInstagram className="mr-2x" /> Instagram
                    </a>
                  </li>
                  <li>
                    <a href="" className="d-flex align-items-center">
                      <FiLinkedin className="mr-2x" /> Linkedin
                    </a>
                  </li>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="address">
                <h2>Address</h2>
                <div className="address-links">
                  <li className="address1">
                    <i className="fa-solid fa-location-dot" /> Freak Street, NewCastle, Australia
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-solid fa-phone" /> +91 478 934934
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-solid fa-envelope" /> mail@universitytimetable.com
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <section id="copy-right">
        <div className="copy-right-sec">
          <i className="fa-solid fa-copyright" />© 2024 All rights reserved. Powered by{' '}
          <a href="#">University Timetable</a>
        </div>
      </section>
    </section>
  );
};

export default Footer;
